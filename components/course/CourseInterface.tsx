"use client";

import Link from "next/link";
import { COURSE_NAMES } from "@/lib/constants";
import type { Purchase } from "@/lib/purchases";

type Props = {
  courseId: string;
  purchase: Purchase;
};

function lockedBox(children: React.ReactNode) {
  return (
    <div className="timeline-content timeline-content--locked" role="note">
      {children}
    </div>
  );
}

export function CourseInterface({ courseId, purchase }: Props) {
  const progress = purchase.progress_percentage;
  const isAlgebra = purchase.course_name === COURSE_NAMES.algebra;

  const s = (path: string) => `/course/${courseId}/${path}`;

  return (
    <main>
      <section className="course-interface-section">
        <div className="course-header">
          <h1 style={{ textAlign: "center", fontSize: "3em" }}>
            {purchase.course_name}
          </h1>
        </div>
        <div className="course-overview">
          <h2 style={{ textAlign: "center", marginTop: "2em" }}>
            Course Overview
          </h2>
          <ol className="timeline-steps">
            <li className="timeline-item">
              {progress >= 0 ? (
                <Link href={s("step_1_take_test_1")} className="timeline-content">
                  <strong>Step 1:</strong> Take Practice Test 1.
                </Link>
              ) : (
                lockedBox(
                  <>
                    <strong>Step 1:</strong> Take Practice Test 1. (Locked)
                  </>,
                )
              )}
            </li>
            <li className="timeline-item">
              {(isAlgebra && progress >= 20) || (!isAlgebra && progress >= 11) ? (
                <Link href={s("step_2_score_test_1")} className="timeline-content">
                  <strong>Step 2:</strong> Score Practice Test 1.
                </Link>
              ) : (
                lockedBox(
                  <>
                    <strong>Step 2:</strong> Score Practice Test 1. (Locked)
                  </>,
                )
              )}
            </li>
            <li className="timeline-item">
              {(isAlgebra && progress >= 40) || (!isAlgebra && progress >= 22) ? (
                <Link href={s("step_3_watch_videos_1")} className="timeline-content">
                  <strong>Step 3:</strong> Watch the videos for every missed
                  question from Practice Test 1.
                </Link>
              ) : (
                lockedBox(
                  <>
                    <strong>Step 3:</strong> Watch the videos for every missed
                    question from Practice Test 1. (Locked)
                  </>,
                )
              )}
            </li>
            {!isAlgebra ? (
              <>
                <li className="timeline-item">
                  {progress >= 33 ? (
                    <Link href={s("step_4_take_test_2")} className="timeline-content">
                      <strong>Step 4:</strong> Take Practice Test 2.
                    </Link>
                  ) : (
                    lockedBox(
                      <>
                        <strong>Step 4:</strong> Take Practice Test 2. (Locked)
                      </>,
                    )
                  )}
                </li>
                <li className="timeline-item">
                  {progress >= 44 ? (
                    <Link href={s("step_5_score_test_2")} className="timeline-content">
                      <strong>Step 5:</strong> Score Practice Test 2.
                    </Link>
                  ) : (
                    lockedBox(
                      <>
                        <strong>Step 5:</strong> Score Practice Test 2. (Locked)
                      </>,
                    )
                  )}
                </li>
                <li className="timeline-item">
                  {progress >= 56 ? (
                    <Link
                      href={s("step_6_watch_videos_2")}
                      className="timeline-content"
                    >
                      <strong>Step 6:</strong> Watch videos for missed questions
                      from Practice Test 2.
                    </Link>
                  ) : (
                    lockedBox(
                      <>
                        <strong>Step 6:</strong> Watch videos for missed questions
                        from Practice Test 2. (Locked)
                      </>,
                    )
                  )}
                </li>
                <li className="timeline-item">
                  {progress >= 67 ? (
                    <Link
                      href={s("step_7_practice_categories")}
                      className="timeline-content"
                    >
                      <strong>Step 7:</strong> Practice by Problem Category.
                    </Link>
                  ) : (
                    lockedBox(
                      <>
                        <strong>Step 7:</strong> Practice by Problem Category.
                        (Locked)
                      </>,
                    )
                  )}
                </li>
              </>
            ) : null}
            <li className="timeline-item">
              {(isAlgebra && progress >= 60) || (!isAlgebra && progress >= 78) ? (
                <Link href={s("step_8_redo_missed")} className="timeline-content">
                  <strong>Step {isAlgebra ? 4 : 8}:</strong> Redo all missed
                  questions.
                </Link>
              ) : (
                lockedBox(
                  <>
                    <strong>Step {isAlgebra ? 4 : 8}:</strong> Redo all missed
                    questions. (Locked)
                  </>,
                )
              )}
            </li>
            <li className="timeline-item">
              {(isAlgebra && progress >= 80) || (!isAlgebra && progress >= 89) ? (
                <Link
                  href={s("step_9_congratulations")}
                  className="timeline-content"
                >
                  <strong>Step {isAlgebra ? 5 : 9}:</strong> Congratulations!
                </Link>
              ) : (
                lockedBox(
                  <>
                    <strong>Step {isAlgebra ? 5 : 9}:</strong> Congratulations!
                    (Locked)
                  </>,
                )
              )}
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
