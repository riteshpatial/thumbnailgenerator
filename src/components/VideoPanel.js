import React from "react";

export default function VideoPanel({
  videoRef,
  canvasRef,
  videoFile,
  videoResolution,
  fileSize,
  canUndo,
  canRedo,
  hasSelection,
  hasThumbnails,
  onGenerate,
  onUndo,
  onRedo,
  onRemove,
  onDownload,
  onDownloadAll,
}) {
  return (
    <div className="video-container">
      <video ref={videoRef} src={videoFile} controls className="video-element" style={{ width: "50%" }} />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div className="video-info">
        <p>Resolution: {videoResolution}</p>
        <p>File Size: {fileSize}</p>
      </div>
      <div className="button-container">
        <button onClick={onGenerate}>Generate Thumbnail</button>
        <button onClick={onUndo} disabled={!canUndo}>Undo</button>
        <button onClick={onRedo} disabled={!canRedo}>Redo</button>
        <button onClick={onRemove} disabled={!hasSelection}>Remove</button>
        <button onClick={onDownload} disabled={!hasSelection}>Download</button>
        <button onClick={onDownloadAll} disabled={!hasThumbnails}>Download All</button>
      </div>
    </div>
  );
}
