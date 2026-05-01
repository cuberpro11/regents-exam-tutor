import Link from "next/link";
import { CourseSignedHlsPlayer } from "@/components/CourseSignedHlsPlayer";
import { VideoQuestionGrid } from "@/components/course/VideoQuestionGrid";
import { COURSE_NAMES } from "@/lib/constants";
import type { Purchase } from "@/lib/purchases";

type Props = {
  slug: string;
  courseId: string;
  purchase: Purchase;
};

function shell(children: React.ReactNode) {
  return (
    <main>
      <div className="step-container course-step-page">{children}</div>
    </main>
  );
}

export function CourseStepBody({ slug, courseId, purchase }: Props) {
  const cn = purchase.course_name;
  const isGeo = cn === COURSE_NAMES.geometry;
  const isAlgebra = cn === COURSE_NAMES.algebra;

  switch (slug) {
    case "step_1_take_test_1":
      return shell(
        <>
          <p className="course-name">{cn}</p>
          <h1 className="step-title">Step 1: Take Practice Test 1</h1>
          <div className="step-video-frame">
            <div className="step-video-inner">
              <CourseSignedHlsPlayer
                courseId={courseId}
                testNum={1}
                questionNum={0}
                controls
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="instructions">
            <h2>Instructions:</h2>
            <p>
              Welcome to the first step of your Regents prep course! In this
              step, you will take your first practice test. This will help us to
              gauge your current understanding of the material and identify
              areas where you may need additional support.
            </p>
            <ul className="step-instruction-list">
              <li>
                Set aside a quiet time to take the test, free from distractions.
              </li>
              <li>Have a pencil and paper ready to work through the problems.</li>
              <li>Time yourself to get a feel for the pacing of the actual exam.</li>
              <li>
                Don&apos;t worry if you don&apos;t know all the answers. This is
                just a starting point!
              </li>
            </ul>
            <div className="step-download-block">
              <p className="step-download-label">Download Practice Test 1:</p>
              {isGeo ? (
                <a
                  href="/test_pdfs/June_22_Geometry_Exam.pdf"
                  download
                  className="btn-download-pdf"
                >
                  Download June 2022 Geometry Exam (PDF)
                </a>
              ) : (
                <a
                  href="/test_pdfs/January_23_Algebra_I_Exam.pdf"
                  download
                  className="btn-download-pdf"
                >
                  Download January 2023 Algebra I Exam (PDF)
                </a>
              )}
            </div>
            <p className="step-instructions-closing">
              Once you have completed the test, you will move on to the next
              step, where you will score your test and review your results.
            </p>
          </div>
          <div className="step-next-footer">
            <Link
              href={`/course/${courseId}/step_2_score_test_1`}
              className="btn btn-primary step-next-primary-btn"
            >
              Next Step: Score Test 1
            </Link>
          </div>
        </>,
      );
    case "step_2_score_test_1":
      return shell(
        <>
          <p className="course-name">{cn}</p>
          <h1 className="step-title">Step 2: Score Practice Test 1</h1>
          <div className="image-container">
            <img
              src="/static/score_test.jpeg"
              alt="Score Test Instructions"
            />
          </div>
          <div className="instructions">
            <h2>Instructions:</h2>
            <p>
              Great job on completing the first practice test! Now it&apos;s
              time to see how you did. In this step, you will score your test to
              identify your strengths and weaknesses.
            </p>
            <ul className="step-instruction-list">
              <li>Download the answer key for Practice Test 1.</li>
              <li>
                Carefully compare your answers to the key, marking any incorrect
                responses.
              </li>
              <li>
                Calculate your raw score based on the number of correct
                answers.
              </li>
              <li>
                Make a list of the topics or question types you struggled with.
                This will be your focus for the next step.
              </li>
            </ul>
            <p className="step-instructions-closing">
              Understanding your mistakes is the most important part of the
              learning process. Let&apos;s get scoring!
            </p>
          </div>
          <div className="step-next-footer">
            <Link
              href={`/course/${courseId}/step_3_watch_videos_1`}
              className="btn btn-primary step-next-primary-btn"
            >
              Next Step: Watch Videos 1
            </Link>
          </div>
        </>,
      );
    case "step_3_watch_videos_1":
      return shell(
        <VideoQuestionGrid courseId={courseId} purchase={purchase} stepQuery="3" />,
      );
    case "step_4_take_test_2":
      return shell(
        <>
          <p className="course-name">{cn}</p>
          <h1 className="step-title">Step 4: Take Practice Test 2</h1>
          <div className="image-container">
            <img
              src={isGeo ? "/static/take_test2.jpeg" : "/static/take_test1.png"}
              alt="Take practice test 2"
            />
          </div>
          <div className="instructions">
            <h2>Instructions:</h2>
            <p>
              You&apos;ve reviewed your mistakes and learned from the video
              explanations. Now it&apos;s time to apply what you&apos;ve learned.
              In this step, you will take your second practice test.
            </p>
            <ul className="step-instruction-list">
              <li>Find a quiet place to focus on the test.</li>
              <li>
                As you take the test, try to apply the new strategies you
                learned from the videos.
              </li>
              <li>
                Keep an eye on the clock to continue practicing your time
                management skills.
              </li>
              <li>
                The goal is to see improvement, not perfection. Keep a positive
                mindset!
              </li>
            </ul>
            {isGeo ? (
              <div className="course-step-centered-download">
                <h3 className="course-step-subheading">Download Practice Test 2:</h3>
                <a
                  href="/test_pdfs/August_22_Geometry_Exam.pdf"
                  download
                  className="btn-download-pdf"
                >
                  Download August 2022 Geometry Exam (PDF)
                </a>
              </div>
            ) : null}
            <p className="step-instructions-closing">
              Let&apos;s see how much you&apos;ve improved. Good luck!
            </p>
          </div>
          <div className="step-next-footer">
            <Link
              href={`/course/${courseId}/step_5_score_test_2`}
              className="btn btn-primary step-next-primary-btn"
            >
              Next Step: Score Test 2
            </Link>
          </div>
        </>,
      );
    case "step_5_score_test_2":
      return shell(
        <>
          <p className="course-name">{cn}</p>
          <h1 className="step-title">Step 5: Score Practice Test 2</h1>
          <div className="image-container">
            <img
              src="/static/score_test.jpeg"
              alt="Score Test Instructions"
            />
          </div>
          <div className="instructions">
            <h2>Instructions:</h2>
            <p>
              You&apos;ve completed your second practice test. Now, let&apos;s
              see how you&apos;ve improved. In this step, you will score Practice
              Test 2 and compare the results to your first test.
            </p>
            <ul className="step-instruction-list">
              <li>Use the answer key for Practice Test 2 to score your test.</li>
              <li>
                Calculate your new raw score and compare it to your score from
                Practice Test 1.
              </li>
              <li>
                Note any topics where you&apos;ve seen improvement, and any that
                are still challenging.
              </li>
              <li>
                This will help you to focus your efforts for the next round of
                video review.
              </li>
            </ul>
            <p className="step-instructions-closing">
              Progress is the goal. Let&apos;s see how far you&apos;ve come!
            </p>
          </div>
          <div className="step-next-footer">
            <Link
              href={`/course/${courseId}/step_6_watch_videos_2`}
              className="btn btn-primary step-next-primary-btn"
            >
              Next Step: Watch Videos 2
            </Link>
          </div>
        </>,
      );
    case "step_6_watch_videos_2":
      return shell(
        <VideoQuestionGrid courseId={courseId} purchase={purchase} stepQuery="6" />,
      );
    case "step_7_practice_categories":
      return shell(
        <>
          <p className="course-name">{cn}</p>
          <h1 className="step-title">Step 7: Practice by Problem Category</h1>
          <div className="step-video-frame">
            <div className="step-video-inner">
              <CourseSignedHlsPlayer
                courseId={courseId}
                testNum={3}
                questionNum={1}
                controls
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="instructions">
            <h2>Instructions:</h2>
            <p>
              Now that you&apos;ve worked through Practice Tests 1 and 2,
              it&apos;s time to take a deeper dive into the specific types of
              problems where you&apos;re struggling. This step is about
              identifying patterns in your mistakes and mastering entire
              categories of questions.
            </p>
            <div className="category-examples">
              <h3>Examples of Problem Categories:</h3>
              <ul className="step-instruction-list">
                <li>
                  Triangle problems (similarity, congruence, area, perimeter)
                </li>
                <li>Circle problems (arcs, sectors, chords, tangents)</li>
                <li>Linear equations and functions</li>
                <li>Quadratic equations and functions</li>
                <li>Exponential and logarithmic functions</li>
                <li>System of equations</li>
                <li>Polynomial operations</li>
                <li>Trigonometry problems</li>
                <li>Coordinate geometry</li>
                <li>Statistics and probability</li>
              </ul>
            </div>
            <p>
              <strong>Here&apos;s what you need to do:</strong>
            </p>
            <ul className="step-instruction-list">
              <li>
                <strong>Identify Problem Categories:</strong> Look back at your
                missed questions from Practice Tests 1 and 2. Group them by the
                type of problem they represent (e.g., &quot;triangle
                questions,&quot; &quot;quadratic equations,&quot; &quot;coordinate
                geometry&quot;).
              </li>
              <li>
                <strong>Find Your Weak Categories:</strong> Identify which
                categories appear most frequently in your list of missed
                questions. These are your areas that need the most practice.
              </li>
              <li>
                <strong>Watch All Videos in That Category:</strong> Once
                you&apos;ve identified your problem categories, watch all the
                video explanations for questions in those categories, not just
                the ones you missed. This will help you understand the full range
                of problems within that category.
              </li>
              <li>
                <strong>Practice and Learn:</strong> Work through practice
                problems in your weak categories. The goal is to build confidence
                and mastery in these specific areas.
              </li>
              <li>
                <strong>Take Notes:</strong> As you watch the videos, take notes
                on common patterns, strategies, and formulas used for each
                category.
              </li>
            </ul>
            <p className="step-instructions-closing">
              By focusing on problem categories rather than individual questions,
              you&apos;ll develop a deeper understanding of the underlying concepts
              and be better prepared for similar problems on the actual exam.
            </p>
          </div>
          <div className="step-next-footer">
            <Link
              href={`/course/${courseId}/step_8_redo_missed`}
              className="btn btn-primary step-next-primary-btn"
            >
              Next Step: Redo All Missed Questions
            </Link>
          </div>
        </>,
      );
    case "step_8_redo_missed":
      return shell(
        <>
          <p className="course-name">{cn}</p>
          <h1 className="step-title">
            Step {isAlgebra ? 4 : 8}: Redo All Missed Questions
          </h1>
          <div className="image-container">
            <img
              src="/static/redo_every.jpeg"
              alt="Redo All Missed Questions"
            />
          </div>
          <div className="instructions">
            <h2>Instructions:</h2>
            <p>
              This is the final step in your Regents prep journey. To solidify
              your knowledge and ensure you&apos;re ready for the exam, you
              will now redo all the questions you missed across Practice Tests 1
              and 2.
            </p>
            <ul className="step-instruction-list">
              <li>
                Compile a list of all the questions you answered incorrectly
                from Practice Tests 1 and 2.
              </li>
              <li>
                Work through each of these problems again, without looking at
                the answers.
              </li>
              <li>
                If you get stuck, refer to your notes and the video
                explanations you&apos;ve watched.
              </li>
              <li>
                This final review will help to cement the concepts in your mind
                and build your confidence for test day.
              </li>
            </ul>
            <p className="step-instructions-closing">
              You have put in the work, and you are ready. Good luck on the
              Regents exam!
            </p>
          </div>
          <div className="step-next-footer">
            <Link
              href={`/course/${courseId}/step_9_congratulations`}
              className="btn btn-primary step-next-primary-btn"
            >
              Next Step: Congratulations
            </Link>
          </div>
        </>,
      );
    case "step_9_congratulations":
      return shell(
        <>
          <p className="course-name">{cn}</p>
          <h1 className="step-title">
            Step {isAlgebra ? 5 : 9}: Congratulations!
          </h1>
          <div className="step-video-frame">
            <div className="step-video-inner">
              <CourseSignedHlsPlayer
                courseId={courseId}
                testNum={9}
                questionNum={0}
                controls
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="instructions">
            <h2>You&apos;ve Completed the Course!</h2>
            <p>
              You have successfully worked through all the practice tests,
              reviewed video explanations, identified your problem areas, and
              practiced by category. You&apos;ve put in the hard work and
              dedication needed to succeed on the Regents exam.
            </p>
            <p>
              <strong>What you&apos;ve accomplished:</strong>
            </p>
            <ul className="step-instruction-list">
              <li>Completed Practice Tests 1 and 2</li>
              <li>Reviewed video explanations for all missed questions</li>
              <li>Identified and practiced specific problem categories</li>
              <li>Redone all missed questions to reinforce your learning</li>
            </ul>
            <p>
              You are now well-prepared for the Regents exam. Remember to stay
              confident, get plenty of rest before the test, and trust in the
              preparation you&apos;ve done.
            </p>
            <p className="instructions-congrats-outro">
              Good luck on your exam! You&apos;ve got this! 🎓
            </p>
          </div>
          <div className="step-next-footer">
            {(isGeo && purchase.progress_percentage >= 89) ||
            (!isGeo && purchase.progress_percentage >= 80) ? (
              <Link
                href={`/course/${courseId}/complete`}
                className="btn btn-primary step-next-primary-btn step-congrats-complete-btn"
              >
                Complete Course
              </Link>
            ) : null}
          </div>
        </>,
      );
    default:
      return shell(<p>Unknown step.</p>);
  }
}
