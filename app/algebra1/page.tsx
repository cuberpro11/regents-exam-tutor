import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { getSession } from "@/lib/auth";
import { COURSE_NAMES } from "@/lib/constants";
import { getPurchases } from "@/lib/purchases";

export default async function Algebra1Page() {
  const session = await getSession();
  let hasPurchased = false;
  if (session) {
    const purchases = await getPurchases(session.id);
    hasPurchased = purchases.some((p) => p.course_name === COURSE_NAMES.algebra);
  }

  return (
    <main>
      <section className="course-details-section">
        <div className="course-details-container">
          <div className="course-video-thumbnail">
            <img
              src="/static/algebra course.jpg"
              alt="Algebra I Regents Course"
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
            <h1>Algebra I Regents Course</h1>
            <p className="guarantee-text">
              Better score GUARANTEED or your money back + I&apos;ll send you the
              Barron&apos;s book instead!
            </p>
            <div className="what-youll-get">
              <h2>What you&apos;ll get:</h2>
              <ul>
                <li>The most recent exam with full video walkthroughs</li>
                <li>Step-by-step video answer explanations</li>
                <li>
                  Test-taking techniques from Columbia University alum &amp;
                  full-time tutor for 16 years
                </li>
              </ul>
              <p style={{ marginTop: "1.5rem" }}>
                You can upgrade to live tutoring with Sam at the end of the
                course. Reach out to{" "}
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
              <CheckoutButton courseName={COURSE_NAMES.algebra}>Buy</CheckoutButton>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
