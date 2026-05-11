import Link from "next/link";
import { getSession } from "@/lib/auth";
import { COURSE_NAMES, formatCoursePriceUsd } from "@/lib/constants";
import { getPurchases } from "@/lib/purchases";

export default async function CoursesPage() {
  const price = formatCoursePriceUsd();
  const session = await getSession();
  let hasAlgebra = false;
  let hasGeometry = false;
  if (session) {
    const purchases = await getPurchases(session.id);
    hasAlgebra = purchases.some((p) => p.course_name === COURSE_NAMES.algebra);
    hasGeometry = purchases.some((p) => p.course_name === COURSE_NAMES.geometry);
  }

  const algebraHref = hasAlgebra ? "/dashboard" : "/algebra1";
  const geometryHref = hasGeometry ? "/dashboard" : "/geometry";

  return (
    <>
      <section className="page-hero-section courses-hero">
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>Online Regents Courses</h1>
        </div>
      </section>
      <main>
        <section className="courses-section">
          <div className="courses-container">
            <Link href={algebraHref} className="course-card course-card-link">
              <img src="/static/algebra course.jpg" alt="Algebra Course" />
              <div className="course-content">
                <h3>Algebra 1 Regents Course</h3>
                <p className="course-card-price">
                  <span className="course-card-price-amount">{price}</span>
                  <span className="course-card-price-caption"> one-time</span>
                </p>
                <p>
                  Improve your score on the Algebra I Regents Exam with
                  engaging, step-by-step video answers and explanations to all of
                  the questions on the latest administered exams. This
                  self-paced course is far better than studying from black &amp;
                  white books that haven&apos;t changed in a generation. For the
                  past 20 years, I&apos;ve been sharing my test prep teaching
                  style and strategies with students during live sessions through
                  my tutoring practice-lessons that are now available for everyone
                  in this self-paced course.
                </p>
                <span className="btn btn-primary course-card-cta">
                  {hasAlgebra ? "Go to dashboard" : "Learn more & enroll"}
                </span>
              </div>
            </Link>
            <Link href={geometryHref} className="course-card course-card-link">
              <img src="/static/geo course.jpeg" alt="Geometry Course" />
              <div className="course-content">
                <h3>Geometry Regents Course</h3>
                <p className="course-card-price">
                  <span className="course-card-price-amount">{price}</span>
                  <span className="course-card-price-caption"> one-time</span>
                </p>
                <p>
                  This is the best way to earn a strong score on the Geometry
                  Regents Exam. It&apos;s the only Regents prep course with
                  engaging, step-by-step video answers and explanations to all
                  of the questions on the latest administered exams. This
                  self-paced course is far better than studying from black &amp;
                  white books that haven&apos;t changed in a generation. For the
                  past 20 years, I&apos;ve been sharing my test prep teaching
                  style and strategies with students during live sessions through
                  my tutoring practice-lessons that are now available in this
                  self-paced course.
                </p>
                <span className="btn btn-primary course-card-cta">
                  {hasGeometry ? "Go to dashboard" : "Learn more & enroll"}
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
