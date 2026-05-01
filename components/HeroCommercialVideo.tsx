"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { SITE_VIDEOS } from "@/lib/site-videos";

/**
 * Hero: muted autoplay (allowed by browsers), unmute on first tap/click.
 * Unmuted autoplay without gesture is blocked and spams the console.
 */
export function HeroCommercialVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [ready, setReady] = useState(false);

  const heroUrl = SITE_VIDEOS.heroCommercial;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const setupHls = () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = heroUrl;
        setReady(true);
        return;
      }
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(heroUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => setReady(true));
        return;
      }
      video.src = heroUrl;
      setReady(true);
    };

    setupHls();

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [heroUrl]);

  useEffect(() => {
    if (!ready) return;
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.volume = 1;
    video.play().catch(() => {});

    const onEnded = () => {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
    };

    const enableSound = () => {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", onEnded);

    const ac = new AbortController();
    const opts = { once: true, signal: ac.signal, passive: true } as const;
    document.addEventListener("click", enableSound, opts);
    document.addEventListener("touchstart", enableSound, opts);

    return () => {
      ac.abort();
      video.removeEventListener("ended", onEnded);
    };
  }, [ready]);

  return (
    <video
      ref={ref}
      className="hero-video-el"
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
