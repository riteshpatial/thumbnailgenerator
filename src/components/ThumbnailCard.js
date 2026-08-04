import React from "react";
import { formatTimecode } from "../utils/formatTimecode";
import { useTilt } from "../hooks/useTilt";

export default function ThumbnailCard({ thumbnail, isSelected, onSelect, index }) {
  const tilt = useTilt();

  return (
    <div
      ref={tilt.ref}
      className={`thumbnail-card panel-in ${isSelected ? "selected" : ""}`}
      style={{ animationDelay: `${Math.min(index * 25, 400)}ms`, ...tilt.style }}
      onClick={onSelect}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <img src={thumbnail.data} alt={`Frame at ${thumbnail.time} seconds`} />
      <span className="thumbnail-card__timecode">{formatTimecode(thumbnail.time)}</span>
    </div>
  );
}
