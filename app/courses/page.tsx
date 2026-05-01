import Link from "next/link";

export default function CoursesPage() {
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
            <div className="course-card">
              <img src="/static/algebra course.jpg" alt="Algebra Course" />
              <div className="course-content">
                <h3>Algebra 1 Regents Course</h3>
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
                <Link href="/algebra1" className="btn btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="course-card">
              <img src="/static/geo course.jpeg" alt="Geometry Course" />
              <div className="course-content">
                <h3>Geometry Regents Course</h3>
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
                <Link href="/geometry" className="btn btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
