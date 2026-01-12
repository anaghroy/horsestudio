import { useEffect, useRef } from "react";
import music from "../assets/audio/ambience.mp3";
const BackgroundAudio = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio instance
    audioRef.current = new Audio(music);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Start audio on first user interaction
    const startAudio = () => {
      audioRef.current.play().catch(() => {});
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("click", startAudio);
    };

    window.addEventListener("scroll", startAudio, { once: true });
    window.addEventListener("click", startAudio, { once: true });

    const handleVisibility = () => {
      if (document.hidden) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("click", startAudio);

      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
};

export default BackgroundAudio;
