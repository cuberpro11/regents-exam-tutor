import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardCourseCard } from "@/components/DashboardCourseCard";
import { getSession } from "@/lib/auth";
import { COURSE_NAMES } from "@/lib/constants";
import { DASHBOARD_COURSE_COPY } from "@/lib/course-meta";
import { getPurchases } from "@/lib/purchases";

export const dynamic = "force-dynamic";

function courseHeroImage(courseName: string): string {
  if (courseName === COURSE_NAMES.algebra) {
    return "/static/algebra course.jpg";
  }
  if (courseName === COURSE_NAMES.geometry) {
    return "/static/geo course.jpeg";
  }
  return "/static/algebra course.jpg";
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login?next=/dashboard");
  }
  const purchasedCourses = await getPurchases(session.id);
  const n = purchasedCourses.length;
  const completedCount = purchasedCourses.filter(
    (c) => c.progress_percentage >= 100,
  ).length;

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div className="dashboard-header__lead">
            <p className="dashboard-kicker">Dashboard</p>
            <h1 className="dashboard-heading">My courses</h1>
            <p className="dashboard-subtle">{session.email}</p>
          </div>
          {n > 0 ? (
            <div className="dashboard-header__tools">
              <div
                className="dashboard-stat-pills"
                aria-label={`${completedCount} of ${n} courses completed`}
              >
                <span className="dashboard-pill dashboard-pill--accent">
                  {completedCount} out of {n} complete
                </span>
              </div>
            </div>
          ) : null}
        </header>

        {n === 0 ? (
          <section className="dashboard-empty" aria-labelledby="dashboard-empty-title">
            <div className="dashboard-empty__panel">
              <div className="dashboard-empty__mark" aria-hidden />
              <h2 id="dashboard-empty-title" className="dashboard-empty__title">
                No enrollments yet
              </h2>
              <p className="dashboard-empty__text">
                Browse the catalog for Algebra I and Geometry Regents prep—full
                video solutions and structured review you can use on your own
                schedule.
              </p>
              <div className="dashboard-empty__actions">
                <Link href="/courses" className="btn btn-primary">
                  Browse courses
                </Link>
                <Link href="/faq" className="dashboard-empty__secondary">
                  FAQ
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <div className="dashboard-course-grid">
            {purchasedCourses.map((course) => {
              const meta = DASHBOARD_COURSE_COPY[course.course_name];
              return (
                <DashboardCourseCard
                  key={course.id}
                  course={course}
                  description={
                    meta?.description ??
                    "Regents prep with video explanations and practice."
                  }
                  imageSrc={courseHeroImage(course.course_name)}
                  imageAlt={course.course_name}
                  href={`/course/${course.id}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
