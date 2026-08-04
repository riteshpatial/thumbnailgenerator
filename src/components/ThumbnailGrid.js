import React from "react";
import ThumbnailCard from "./ThumbnailCard";

export default function ThumbnailGrid({ thumbnails, currentThumbnailIndex, onSelect }) {
  if (thumbnails.length === 0) {
    return null;
  }

  return (
    <div className="canvas">
      <h2>Generated Thumbnails:</h2>
      <div className="thumbnail-grid">
        {thumbnails.map((thumbnail, index) => (
          <ThumbnailCard
            key={index}
            thumbnail={thumbnail}
            isSelected={index === currentThumbnailIndex}
            onSelect={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}
