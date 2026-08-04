import React from "react";
import { formatTimecode } from "../utils/formatTimecode";

export default function ThumbnailCard({ thumbnail, isSelected, onSelect }) {
  return (
    <div className={`thumbnail-card ${isSelected ? "selected" : ""}`} onClick={onSelect}>
      <img src={thumbnail.data} alt={`Frame at ${thumbnail.time} seconds`} />
      <span className="thumbnail-card__timecode">{formatTimecode(thumbnail.time)}</span>
    </div>
  );
}
