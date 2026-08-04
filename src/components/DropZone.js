import React, { useState } from "react";
import { useTilt } from "../hooks/useTilt";

export default function DropZone({ onFileSelected }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const tilt = useTilt();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onFileSelected(e.dataTransfer.files[0]);
  };

  return (
    <div
      ref={tilt.ref}
      className={`drop-zone panel-in ${isDragOver ? "dragover" : ""}`}
      style={tilt.style}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <input type="file" accept="video/*" onChange={(e) => onFileSelected(e.target.files[0])} />
      <p>Drop a video file here, or click to browse.</p>
    </div>
  );
}
