"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Purchase } from "@/lib/purchases";

type Props = {
  course: Purchase;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export function DashboardCourseCard({
  course,
  description,
  imageSrc,
  imageAlt,
  href,
}: Props) {
  const pct = Math.min(100, Math.max(0, course.progress_percentage));
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setBarWidth(pct);
      return;
    }
    const id = requestAnimationFrame(() => setBarWidth(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);

  const live = course.has_live_session > 0;

  return (
    <Link href={href} className="dash-course-card">
      <div className="dash-course-card__media">
        <img src={imageSrc} alt={imageAlt} width={640} height={360} />
      </div>
      <div className="dash-course-card__body">
        <div className="dash-course-card__top">
          <h2 className="dash-course-card__title">{course.course_name}</h2>
          {live ? (
            <span className="dash-course-card__badge">Live add-on</span>
          ) : null}
        </div>
        <p className="dash-course-card__desc">{description}</p>
        <div className="dash-course-card__progress">
          <div className="dash-course-card__progress-row">
            <span className="dash-course-card__progress-label">Progress</span>
            <span className="dash-course-card__progress-value">{pct}%</span>
          </div>
          <div className="dash-progress-track" aria-hidden>
            <div
              className="dash-progress-fill"
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>
        <div className="dash-course-card__footer">
          <span className="dash-course-card__cta">Continue learning</span>
          <span className="dash-course-card__cta-icon" aria-hidden>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
