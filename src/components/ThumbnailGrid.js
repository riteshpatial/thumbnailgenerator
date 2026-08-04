import React from "react";
import ThumbnailCard from "./ThumbnailCard";

export default function ThumbnailGrid({ thumbnails, currentThumbnailIndex, onSelect }) {
  if (thumbnails.length === 0) {
    return null;
  }

  return (
    <div className="contact-sheet">
      <div className="contact-sheet__sprocket" aria-hidden="true" />
      <div className="contact-sheet__body">
        <h2>Contact Sheet</h2>
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
      <div className="contact-sheet__sprocket" aria-hidden="true" />
    </div>
  );
}
