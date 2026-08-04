import { useRef, useState } from "react";

const MAX_TILT_DEG = 7;

// Mouse-tracked 3D tilt for cards. No-ops under prefers-reduced-motion.
export function useTilt() {
  const ref = useRef(null);
  const [transform, setTransform] = useState(null);
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const handleMouseMove = (event) => {
    if (reducedMotion.current || !ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(600px) rotateX(${(-y * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(x * MAX_TILT_DEG).toFixed(2)}deg)`
    );
  };

  const handleMouseLeave = () => setTransform(null);

  return {
    ref,
    style: transform ? { transform } : undefined,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
