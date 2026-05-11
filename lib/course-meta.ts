import { COURSE_NAMES } from "@/lib/constants";

export const DASHBOARD_COURSE_COPY: Record<
  string,
  { route: string; description: string }
> = {
  [COURSE_NAMES.algebra]: {
    route: "algebra1",
    description:
      "Recent-exam video walkthroughs and step-by-step solutions for every question.",
  },
  [COURSE_NAMES.geometry]: {
    route: "geometry",
    description:
      "Exam-based Geometry review with organized topic paths and full explanations.",
  },
};
