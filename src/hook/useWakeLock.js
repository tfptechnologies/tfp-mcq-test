import { useEffect, useRef } from "react";

const useWakeLock = (active) => {
  const wakeLockRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
          console.log("✅ Wake Lock active");

          wakeLockRef.current.addEventListener("release", () => {
            console.log("❌ Wake Lock released");
          });
        } else {
          console.log("Wake Lock not supported");
        }
      } catch (err) {
        console.log("Wake Lock error:", err);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
  }, [active]);
};

export default useWakeLock;
