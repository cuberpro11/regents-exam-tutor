import { CheckoutButton } from "@/components/CheckoutButton";
import {
  COURSE_NAMES,
  formatCoursePriceUsd,
  type CourseName,
} from "@/lib/constants";

type Props = {
  courseName: CourseName;
};

export function CoursePurchaseCard({ courseName }: Props) {
  const price = formatCoursePriceUsd();

  return (
    <div className="course-purchase-card">
      <p className="course-purchase-kicker">Self-paced course</p>
      <p className="course-purchase-price">
        {price}
        <span className="course-purchase-price-note"> one-time</span>
      </p>
      <ul className="course-purchase-mini-list">
        <li>Full course access</li>
        <li>Instant access after checkout</li>
        <li>Secure payment via Stripe</li>
      </ul>
      <CheckoutButton
        courseName={courseName}
        className="btn btn-primary course-purchase-cta"
      >
        Buy now — {price}
      </CheckoutButton>
      <p className="course-purchase-footnote">
        {courseName === COURSE_NAMES.algebra ? (
          <>
            Algebra I Regents — money-back satisfaction guarantee. Questions?{" "}
            <a href="mailto:sam@yorkvilletutor.com">Email Sam</a>.
          </>
        ) : (
          <>
            Geometry Regents — money-back satisfaction guarantee. Questions?{" "}
            <a href="mailto:sam@yorkvilletutor.com">Email Sam</a>.
          </>
        )}
      </p>
    </div>
  );
}
