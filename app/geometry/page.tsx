import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { getSession } from "@/lib/auth";
import { COURSE_NAMES } from "@/lib/constants";
import { getPurchases } from "@/lib/purchases";

export default async function GeometryPage() {
  const session = await getSession();
  let hasPurchased = false;
  if (session) {
    const purchases = await getPurchases(session.id);
    hasPurchased = purchases.some((p) => p.course_name === COURSE_NAMES.geometry);
  }

  return (
    <main>
      <section className="course-details-section">
        <div className="course-details-container">
          <div className="course-video-thumbnail">
            <img
              src="/static/geo course.jpeg"
              alt="Geometry Regents Course"
              style={{
                width: "100%",
                maxWidth: 800,
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
          <div className="course-details-content">
            <h1>Geometry Regents Course</h1>
            <p className="guarantee-text">
              Better score GUARANTEED or your money back + I&apos;ll send you the
              Barron&apos;s book instead!
            </p>
            <div className="what-youll-get">
              <h2>What you&apos;ll get:</h2>
              <ul>
                <li>Recent exams with step-by-step video explanations</li>
                <li>Organized review by test and by topic</li>
                <li>
                  Strategies from a Columbia alum and experienced Regents tutor
                </li>
              </ul>
              <p style={{ marginTop: "1.5rem" }}>
                Email{" "}
                <a href="mailto:sam@yorkvilletutor.com">sam@yorkvilletutor.com</a>{" "}
                with any questions.
              </p>
            </div>
          </div>
          <div className="course-details-buy">
            {hasPurchased ? (
              <Link href="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <CheckoutButton courseName={COURSE_NAMES.geometry}>Buy</CheckoutButton>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
