import Link from "next/link";
import { CourseSignedHlsPlayer } from "@/components/CourseSignedHlsPlayer";
import { maxQuestionsForCourse, testNumFromStepQuery } from "@/lib/course-video-helpers";
import type { Purchase } from "@/lib/purchases";

type Props = {
  courseId: string;
  purchase: Purchase;
  questionNum: number;
  stepQuery: string;
};

export function VideoQuestionView({
  courseId,
  purchase,
  questionNum,
  stepQuery,
}: Props) {
  const testNum = testNumFromStepQuery(stepQuery);
  const maxQ = maxQuestionsForCourse(purchase.course_name);
  const nextNum = questionNum + 1;
  const hasNext = nextNum <= maxQ;
  const backHref =
    stepQuery === "3"
      ? `/course/${courseId}/step_3_watch_videos_1`
      : stepQuery === "6"
        ? `/course/${courseId}/step_6_watch_videos_2`
        : `/course/${courseId}/step_9_congratulations`;

  return (
    <main className="course-video-question-main">
      <div className="video-page-container">
        <div className="video-page-header">
          <p className="video-page-course-name">{purchase.course_name}</p>
          <h1 className="video-page-title">
            {questionNum === 0 ? "Welcome video" : `Question ${questionNum}`}
          </h1>
          <p className="video-page-test-label">Practice Test {testNum}</p>
        </div>
        <div className="video-page-player">
          <CourseSignedHlsPlayer
            courseId={courseId}
            testNum={testNum}
            questionNum={questionNum}
            controls
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </div>
        <div className="video-page-actions">
          {hasNext ? (
            <Link
              href={`/course/${courseId}/video/${nextNum}?step=${stepQuery}`}
              className="btn btn-primary"
            >
              Next Question →
            </Link>
          ) : (
            <Link href={backHref} className="btn btn-primary">
              Back to Video List
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
