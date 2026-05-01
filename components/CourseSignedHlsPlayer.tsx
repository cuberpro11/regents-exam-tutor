"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = {
  courseId: string;
  testNum: number;
  questionNum: number;
  className?: string;
  controls?: boolean;
  style?: React.CSSProperties;
};

/**
 * Loads signed HLS URL from /api/video (same contract as Flask app).
 */
export function CourseSignedHlsPlayer({
  courseId,
  testNum,
  questionNum,
  className,
  controls = true,
  style,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/video/${courseId}/${testNum}/${questionNum}`,
          { credentials: "include" },
        );
        const data = (await res.json()) as { video_url?: string };
        if (cancelled || !data.video_url) return;

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = data.video_url;
          return;
        }
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(data.video_url);
          hls.attachMedia(video);
          hls.on(Hls.Events.ERROR, (_, d) => {
            if (d.fatal) {
              video.src = "/static/placeholder.mp4";
              video.load();
            }
          });
        } else {
          video.src = "/static/placeholder.mp4";
        }
      } catch {
        if (video) {
          video.src = "/static/placeholder.mp4";
          video.load();
        }
      }
    })();

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [courseId, testNum, questionNum]);

  return (
    <video
      ref={videoRef}
      className={["course-signed-hls-video", className].filter(Boolean).join(" ")}
      style={{ width: "100%", height: "100%", objectFit: "contain", ...style }}
      controls={controls}
      preload="metadata"
      playsInline
    />
  );
}
