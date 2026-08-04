import React, { useState } from "react";
import { formatTimecode } from "../utils/formatTimecode";

export default function VideoPanel({
  videoRef,
  canvasRef,
  videoFile,
  videoResolution,
  videoDuration,
  fileSize,
  canUndo,
  canRedo,
  hasSelection,
  hasThumbnails,
  isCapturingStoryboard,
  onGenerate,
  onGenerateStoryboard,
  onNudge,
  onUndo,
  onRedo,
  onRemove,
  onDownload,
  onDownloadAll,
}) {
  const [flashKey, setFlashKey] = useState(0);
  const [storyboardInterval, setStoryboardInterval] = useState(5);

  const handleGenerate = () => {
    onGenerate();
    setFlashKey((key) => key + 1);
  };

  const handleStoryboard = () => {
    onGenerateStoryboard(storyboardInterval);
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
        {videoDuration != null && (
          <p><span>Length</span>{formatTimecode(videoDuration)}</p>
        )}
      </div>

      <div className="nudge-row">
        <button onClick={() => onNudge(-0.1)} type="button" title="Step back 0.1s ([)">
          &#8722; 0.1s
        </button>
        <button onClick={handleGenerate} type="button" className="button--primary" title="Capture this frame (C)">
          Capture Frame
        </button>
        <button onClick={() => onNudge(0.1)} type="button" title="Step forward 0.1s (])">
          + 0.1s
        </button>
      </div>

      <div className="button-container">
        <button onClick={onUndo} disabled={!canUndo} type="button" title="Undo (Ctrl+Z)">Undo</button>
        <button onClick={onRedo} disabled={!canRedo} type="button" title="Redo (Ctrl+Shift+Z)">Redo</button>
        <button onClick={onRemove} disabled={!hasSelection} type="button" title="Remove (Backspace)">Remove</button>
        <button onClick={onDownload} disabled={!hasSelection} type="button">Download</button>
        <button onClick={onDownloadAll} disabled={!hasThumbnails} type="button">Download All (.zip)</button>
      </div>

      <p className="shortcut-hint">
        <kbd>C</kbd> capture &middot; <kbd>[</kbd> <kbd>]</kbd> nudge &middot; <kbd>Ctrl</kbd>+<kbd>Z</kbd> undo &middot; <kbd>&#8998;</kbd> remove
      </p>

      <div className="storyboard-row">
        <span className="eyebrow">Storyboard</span>
        <label className="storyboard-row__field">
          every
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={storyboardInterval}
            onChange={(e) => setStoryboardInterval(parseFloat(e.target.value) || 0.5)}
          />
          sec
        </label>
        <button onClick={handleStoryboard} disabled={isCapturingStoryboard} type="button">
          {isCapturingStoryboard ? "Capturing…" : "Generate Storyboard"}
        </button>
      </div>
    </div>
  );
}
