import React from "react";
import { useScrollProgress } from "../hooks/useScrollAnimation";

const ScrollProgress: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div
      className="scroll-progress-indicator"
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
    />
  );
};

export default ScrollProgress;
