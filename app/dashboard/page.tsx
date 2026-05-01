import Link from "next/link";
import { getSession } from "@/lib/auth";
import { DASHBOARD_COURSE_COPY } from "@/lib/course-meta";
import { getPurchases } from "@/lib/purchases";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const purchasedCourses = await getPurchases(session.id);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to your Dashboard!</h1>
          <p>This is your personalized dashboard.</p>
          <h2>Your Purchased Courses</h2>
          <div className="dashboard-courses-container">
            {purchasedCourses.length === 0 ? (
              <p>You have not purchased any courses yet.</p>
            ) : (
              purchasedCourses.map((course) => {
                const meta = DASHBOARD_COURSE_COPY[course.course_name];
                const img =
                  course.course_name === "Algebra 1 Regents"
                    ? "/static/algebra course.jpg"
                    : "/static/geo course.jpeg";
                return (
                  <div key={course.id} className="dashboard-course-card">
                    <div className="course-card-left">
                      <img src={img} alt="" />
                    </div>
                    <div className="course-card-middle">
                      <h3>{course.course_name} Regents Course</h3>
                      <p>{meta?.description ?? ""}</p>
                      <div className="progress-bar-container">
                        <div
                          className="progress-bar"
                          style={{ width: `${course.progress_percentage}%` }}
                        >
                          {course.progress_percentage > 0 ? (
                            <span className="progress-text">
                              {course.progress_percentage}%
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/course/${course.id}`}
                      className="btn btn-primary"
                    >
                      View Course
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
