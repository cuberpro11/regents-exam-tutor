import { COURSE_NAMES } from "@/lib/constants";

export function maxQuestionsForCourse(courseName: string): number {
  return courseName === COURSE_NAMES.algebra ? 37 : 35;
}

export function testNumFromStepQuery(step: string): number {
  if (step === "6") return 2;
  if (step === "9") return 3;
  return 1;
}
