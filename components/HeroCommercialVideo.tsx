"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { SITE_VIDEOS } from "@/lib/site-videos";

/**
 * Hero: play with sound first, then on end mute + loop (matches legacy index.html behavior).
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

  const attemptPlayWithSound = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const video = ref.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    const onEnded = () => {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", onEnded);
    const once = () => attemptPlayWithSound();
    video.addEventListener("canplay", once, { once: true });
    video.addEventListener("loadeddata", once, { once: true });
    video.addEventListener("loadedmetadata", once, { once: true });
    attemptPlayWithSound();

    const enableSoundOnInteraction = () => {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    };
    if (video.paused) {
      document.addEventListener("click", enableSoundOnInteraction, { once: true });
      document.addEventListener("touchstart", enableSoundOnInteraction, { once: true });
      document.addEventListener("scroll", enableSoundOnInteraction, { once: true });
    }

    return () => video.removeEventListener("ended", onEnded);
  }, [ready, attemptPlayWithSound]);

  return (
    <video
      ref={ref}
      className="hero-video-el"
      autoPlay
      playsInline
      preload="auto"
    />
  );
}
