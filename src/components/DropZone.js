import React, { useState } from "react";

export default function DropZone({ onFileSelected }) {
  const [isDragOver, setIsDragOver] = useState(false);

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
      className={`drop-zone ${isDragOver ? "dragover" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" accept="video/*" onChange={(e) => onFileSelected(e.target.files[0])} />
      <p>Drag & Drop your video here or click to upload</p>
    </div>
  );
}
