import React, { useState } from "react";

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
  const [flashKey, setFlashKey] = useState(0);

  const handleGenerate = () => {
    onGenerate();
    setFlashKey((key) => key + 1);
  };

  return (
    <div className="video-container">
      <div className="viewer">
        <span className="viewer__corner--tr" aria-hidden="true" />
        <span className="viewer__corner--bl" aria-hidden="true" />
        <div className="viewer__stage">
          <video ref={videoRef} src={videoFile} controls className="video-element" />
          <canvas ref={canvasRef} className="capture-canvas"></canvas>
          <div key={flashKey} className="viewer__flash" aria-hidden="true" />
        </div>
      </div>

      <div className="video-info">
        <p><span>Res</span>{videoResolution}</p>
        <p><span>Size</span>{fileSize}</p>
      </div>

      <div className="button-container">
        <button onClick={handleGenerate} type="button">Capture Frame</button>
        <button onClick={onUndo} disabled={!canUndo} type="button">Undo</button>
        <button onClick={onRedo} disabled={!canRedo} type="button">Redo</button>
        <button onClick={onRemove} disabled={!hasSelection} type="button">Remove</button>
        <button onClick={onDownload} disabled={!hasSelection} type="button">Download</button>
        <button onClick={onDownloadAll} disabled={!hasThumbnails} type="button">Download All (.zip)</button>
      </div>
    </div>
  );
}
