import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { generateBunnySignedUrl } from "@/lib/bunny";
import { getPurchaseById } from "@/lib/purchases";
import { findVideo } from "@/lib/videos";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      courseId: string;
      testNum: string;
      questionNum: string;
    }>;
  },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId, testNum, questionNum } = await context.params;
  const purchase = await getPurchaseById(session.id, courseId);
  if (!purchase) {
    return NextResponse.json({ error: "Course access denied" }, { status: 403 });
  }

  const securityKey = process.env.BUNNY_SECURITY_KEY;
  if (!securityKey) {
    return NextResponse.json({ error: "Video signing not configured" }, { status: 500 });
  }

  const row = await findVideo(
    purchase.course_name,
    Number(testNum),
    Number(questionNum),
  );
  if (!row) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  const video_url = generateBunnySignedUrl(
    row.video_url,
    session.id,
    row.video_id,
    securityKey,
  );

  return NextResponse.json({ video_url });
}
