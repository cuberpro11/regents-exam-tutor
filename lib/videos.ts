import fs from "fs/promises";
import path from "path";

export type VideoRow = {
  course_name: string;
  test_number: number;
  question_number: number;
  video_id: string;
  video_title: string;
  video_url: string;
};

let cache: VideoRow[] | null = null;

export async function loadVideos(): Promise<VideoRow[]> {
  if (cache) return cache;
  const fp = path.join(process.cwd(), "data", "videos.json");
  const raw = await fs.readFile(fp, "utf8");
  cache = JSON.parse(raw) as VideoRow[];
  return cache;
}

export async function findVideo(
  courseName: string,
  testNumber: number,
  questionNumber: number,
): Promise<VideoRow | undefined> {
  const rows = await loadVideos();
  return rows.find(
    (r) =>
      r.course_name === courseName &&
      r.test_number === testNumber &&
      r.question_number === questionNumber,
  );
}
