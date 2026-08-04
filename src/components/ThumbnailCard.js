import React from "react";
import { formatTimecode } from "../utils/formatTimecode";

export default function ThumbnailCard({ thumbnail, isSelected, onSelect, index }) {
  return (
    <div
      className={`thumbnail-card panel-in ${isSelected ? "selected" : ""}`}
      style={{ animationDelay: `${Math.min(index * 25, 400)}ms` }}
      onClick={onSelect}
    >
      <img src={thumbnail.data} alt={`Frame at ${thumbnail.time} seconds`} />
      <span className="thumbnail-card__timecode">{formatTimecode(thumbnail.time)}</span>
    </div>
  );
}
