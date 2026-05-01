export const SESSION_COOKIE = "regents_session";

export const COURSE_NAMES = {
  algebra: "Algebra 1 Regents",
  geometry: "Geometry Regents",
} as const;

export type CourseName = (typeof COURSE_NAMES)[keyof typeof COURSE_NAMES];

export function getStripePriceId(courseName: string): string | null {
  if (courseName === COURSE_NAMES.algebra) {
    return process.env.STRIPE_PRICE_ID_ALGEBRA ?? null;
  }
  if (courseName === COURSE_NAMES.geometry) {
    return process.env.STRIPE_PRICE_ID_GEOMETRY ?? null;
  }
  return null;
}

export function siteUrl(): string {
  return (
    process.env.URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}
