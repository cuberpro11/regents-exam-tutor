import { COURSE_NAMES } from "@/lib/constants";
import type { Purchase } from "@/lib/purchases";
import { updatePurchaseProgress } from "@/lib/purchases";

export const STEP_SLUG_TO_NUM: Record<string, number> = {
  step_1_take_test_1: 1,
  step_2_score_test_1: 2,
  step_3_watch_videos_1: 3,
  step_4_take_test_2: 4,
  step_5_score_test_2: 5,
  step_6_watch_videos_2: 6,
  step_7_practice_categories: 7,
  step_8_redo_missed: 8,
  step_9_congratulations: 9,
};

const ALGEBRA_SKIP = new Set([
  "step_4_take_test_2",
  "step_5_score_test_2",
  "step_6_watch_videos_2",
  "step_7_practice_categories",
]);

export function shouldRedirectAlgebra(slug: string, courseName: string): boolean {
  return courseName === COURSE_NAMES.algebra && ALGEBRA_SKIP.has(slug);
}

/** Mirrors Flask update_progress (server.py). */
export async function applyStepProgress(
  userId: string,
  purchase: Purchase,
  stepNum: number,
): Promise<{ blockDashboard: boolean }> {
  const isAlgebra = purchase.course_name === COURSE_NAMES.algebra;
  const progressMap: Record<number, number> = isAlgebra
    ? { 1: 0, 2: 20, 3: 40, 8: 60, 9: 80 }
    : { 1: 0, 2: 11, 3: 22, 4: 33, 5: 44, 6: 56, 7: 67, 8: 78, 9: 89 };

  let targetProgress = progressMap[stepNum];
  if (targetProgress === undefined) {
    targetProgress = isAlgebra ? (stepNum - 1) * 20 : (stepNum - 1) * 11;
  }

  const currentProgress = purchase.progress_percentage;

  if (targetProgress > currentProgress) {
    const maxAllowed = Math.max(currentProgress, targetProgress);
    const threshold = isAlgebra ? 25 : 15;
    if (maxAllowed - currentProgress > threshold) {
      return { blockDashboard: true };
    }
  }

  const newProgress = Math.max(currentProgress, targetProgress);
  if (newProgress > currentProgress) {
    await updatePurchaseProgress(userId, purchase.id, newProgress);
  }
  return { blockDashboard: false };
}
