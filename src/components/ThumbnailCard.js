import React from "react";

export default function ThumbnailCard({ thumbnail, isSelected, onSelect }) {
  return (
    <div className={`thumbnail-card ${isSelected ? "selected" : ""}`} onClick={onSelect}>
      <img src={thumbnail.data} alt={`Thumbnail at ${thumbnail.time}s`} style={{ maxWidth: "100%" }} />
      <p>Timestamp: {thumbnail.time} seconds</p>
    </div>
  );
}
