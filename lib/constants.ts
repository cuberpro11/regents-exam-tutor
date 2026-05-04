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

/** Canonical public origin for redirects and Stripe return URLs. Netlify sets `URL`; previews use `DEPLOY_PRIME_URL`. */
export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.URL?.trim() ||
    process.env.DEPLOY_PRIME_URL?.trim() ||
    process.env.DEPLOY_URL?.trim() ||
    "http://localhost:3000";
  return raw.replace(/\/$/, "");
}
