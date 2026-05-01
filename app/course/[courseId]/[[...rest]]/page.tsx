import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { COURSE_NAMES } from "@/lib/constants";
import { CourseInterface } from "@/components/course/CourseInterface";
import { CourseStepBody } from "@/components/course/CourseStepBody";
import { VideoQuestionView } from "@/components/course/VideoQuestionView";
import {
  applyStepProgress,
  shouldRedirectAlgebra,
  STEP_SLUG_TO_NUM,
} from "@/lib/progress-engine";
import { getPurchaseById, updatePurchaseProgress } from "@/lib/purchases";

type Props = {
  params: Promise<{ courseId: string; rest?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DOC_TITLE_SUFFIX = "Regents Exam Tutor";

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { courseId, rest } = await params;
  if (rest?.[0] !== "step_9_congratulations") {
    return {};
  }

  const session = await getSession();
  let stepTitle = "Step 9: Congratulations";
  if (session) {
    const purchase = await getPurchaseById(session.id, courseId);
    if (purchase) {
      const isAlgebra = purchase.course_name === COURSE_NAMES.algebra;
      stepTitle = `Step ${isAlgebra ? 5 : 9}: Congratulations`;
    }
  }

  return { title: `${stepTitle} | ${DOC_TITLE_SUFFIX}` };
}

export default async function CourseCatchAllPage({
  params,
  searchParams,
}: Props) {
  const { courseId, rest } = await params;
  const sp = await searchParams;
  const session = await getSession();
  if (!session) {
    redirect(`/login?next=${encodeURIComponent(`/course/${courseId}`)}`);
  }

  let purchase = await getPurchaseById(session.id, courseId);
  if (!purchase) {
    redirect("/dashboard");
  }

  if (rest?.[0] === "complete") {
    const isAlgebra = purchase.course_name === COURSE_NAMES.algebra;
    const threshold = isAlgebra ? 80 : 89;
    if (purchase.progress_percentage >= threshold) {
      await updatePurchaseProgress(session.id, courseId, 100);
    }
    redirect("/dashboard");
  }

  if (!rest || rest.length === 0) {
    return <CourseInterface courseId={courseId} purchase={purchase} />;
  }

  if (rest[0] === "video" && rest[1] != null) {
    const q = Number.parseInt(rest[1], 10);
    const raw = sp.step;
    const stepQ = typeof raw === "string" ? raw : "3";
    return (
      <VideoQuestionView
        courseId={courseId}
        purchase={purchase}
        questionNum={q}
        stepQuery={stepQ}
      />
    );
  }

  const slug = rest[0];
  if (!slug || !STEP_SLUG_TO_NUM[slug]) {
    notFound();
  }

  if (shouldRedirectAlgebra(slug, purchase.course_name)) {
    redirect(`/course/${courseId}`);
  }

  const stepNum = STEP_SLUG_TO_NUM[slug];
  const { blockDashboard } = await applyStepProgress(
    session.id,
    purchase,
    stepNum,
  );
  if (blockDashboard) {
    redirect("/dashboard");
  }

  purchase = (await getPurchaseById(session.id, courseId))!;

  return <CourseStepBody slug={slug} courseId={courseId} purchase={purchase} />;
}
