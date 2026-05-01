import Link from "next/link";
import type { ReactNode } from "react";
import { CourseSignedHlsPlayer } from "@/components/CourseSignedHlsPlayer";
import { COURSE_NAMES } from "@/lib/constants";
import { maxQuestionsForCourse } from "@/lib/course-video-helpers";
import type { Purchase } from "@/lib/purchases";

type Props = {
  courseId: string;
  purchase: Purchase;
  stepQuery: string;
};

function stepMeta(
  stepQuery: string,
  courseName: string,
): {
  title: string;
  previewTestNum: number;
  previewQuestionNum: number;
  intro: ReactNode;
  bullets: ReactNode;
  closing: ReactNode;
} {
  const isAlgebra = courseName === COURSE_NAMES.algebra;
  if (stepQuery === "3") {
    return {
      title: "Step 3: Watch Videos for Missed Questions",
      previewTestNum: 1,
      /* Matches legacy Flask step3: intro after PT1 (Algebra Q38, Geometry Q36). */
      previewQuestionNum: isAlgebra ? 38 : 36,
      intro: (
        <p>
          Now that you&apos;ve identified the questions you missed on Practice
          Test 1, it&apos;s time to learn from your mistakes. In this step, you
          will watch targeted video explanations for each question you answered
          incorrectly.
        </p>
      ),
      bullets: (
        <ul className="step-instruction-list">
          <li>Go through your list of missed questions from the previous step.</li>
          <li>
            For each question, find and watch the corresponding video explanation.
          </li>
          <li>
            Pay close attention to the concepts and strategies explained in the
            videos.
          </li>
          <li>
            Take notes on any new information or techniques you learn.
          </li>
        </ul>
      ),
      closing: (
        <p className="step-instructions-closing">
          This is where the real learning happens! By focusing on your weak
          areas, you&apos;ll be able to make significant improvements in your
          understanding of the material.
        </p>
      ),
    };
  }
  /* Step 6 — Flask uses static redo_missed.jpeg hero + this copy for all courses */
  return {
    title: "Step 6: Watch Videos for Missed Questions",
    previewTestNum: 2,
    previewQuestionNum: 1,
    intro: (
      <p>
        You&apos;ve identified your remaining areas of difficulty from Practice
        Test 2. Now it&apos;s time to dig in and master those concepts. In this
        step, you will watch video explanations for the questions you missed.
      </p>
    ),
    bullets: (
      <ul className="step-instruction-list">
        <li>
          Create a new list of the questions you answered incorrectly on
          Practice Test 2.
        </li>
        <li>Watch the video explanation for each of these questions.</li>
        <li>
          If you&apos;re still unsure about a concept, don&apos;t hesitate to
          re-watch the video or seek additional resources.
        </li>
        <li>
          The key is to be thorough and ensure you understand the material before
          moving on.
        </li>
      </ul>
    ),
    closing: (
      <p className="step-instructions-closing">
        Repetition and focused learning are the keys to success. Let&apos;s keep
        up the great work!
      </p>
    ),
  };
}

function nextHrefAndLabel(
  courseId: string,
  stepQuery: string,
  courseName: string,
): { href: string; label: string } {
  const isAlgebra = courseName === COURSE_NAMES.algebra;
  if (stepQuery === "3") {
    if (isAlgebra) {
      return {
        href: `/course/${courseId}/step_8_redo_missed`,
        label: "Next Step: Redo All Missed Questions",
      };
    }
    return {
      href: `/course/${courseId}/step_4_take_test_2`,
      label: "Next Step: Take Practice Test 2",
    };
  }
  return {
    href: `/course/${courseId}/step_7_practice_categories`,
    label: "Next Step: Practice by Problem Category",
  };
}

export function VideoQuestionGrid({ courseId, purchase, stepQuery }: Props) {
  const max = maxQuestionsForCourse(purchase.course_name);
  const items = Array.from({ length: max }, (_, i) => i + 1);
  const meta = stepMeta(stepQuery, purchase.course_name);
  const next = nextHrefAndLabel(courseId, stepQuery, purchase.course_name);

  return (
    <div className="course-step-video-step">
      <p className="course-name">{purchase.course_name}</p>
      <h1 className="step-title">{meta.title}</h1>

      {stepQuery === "6" ? (
        <div className="image-container">
          <img
            src="/static/redo_missed.jpeg"
            alt="Watch videos for missed questions from Practice Test 2"
          />
        </div>
      ) : (
        <div className="step-video-frame">
          <div className="step-video-inner">
            <CourseSignedHlsPlayer
              courseId={courseId}
              testNum={meta.previewTestNum}
              questionNum={meta.previewQuestionNum}
              controls
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
          </div>
        </div>
      )}

      <div className="instructions">
        <h2>Instructions:</h2>
        {meta.intro}
        {meta.bullets}
        {meta.closing}
      </div>

      <details className="video-questions-disclosure" open>
        <summary className="video-questions-disclosure__summary">
          <span className="video-questions-disclosure__title">
            View All Video Questions ({max} questions)
          </span>
          <span className="video-questions-disclosure__chevron" aria-hidden />
        </summary>
        <div className="video-questions-grid">
          {items.map((q) => (
            <Link
              key={q}
              href={`/course/${courseId}/video/${q}?step=${stepQuery}`}
              className="video-q-grid-btn"
            >
              Q {q}
            </Link>
          ))}
        </div>
      </details>

      <div className="step-next-footer">
        <Link href={next.href} className="btn btn-primary step-next-primary-btn">
          {next.label}
        </Link>
      </div>
    </div>
  );
}
