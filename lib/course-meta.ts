import { COURSE_NAMES } from "@/lib/constants";

export const DASHBOARD_COURSE_COPY: Record<
  string,
  { route: string; description: string }
> = {
  [COURSE_NAMES.algebra]: {
    route: "algebra1",
    description:
      "A comprehensive review of Algebra 1 topics for the Regents exam.",
  },
  [COURSE_NAMES.geometry]: {
    route: "geometry",
    description:
      "Master the concepts of Geometry for the Regents exam.",
  },
};
