import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";

import { useDarkMode } from "./hooks/useDarkMode";
import { useThumbnailManager } from "./hooks/useThumbnailManager";

import DarkModeToggle from "./components/DarkModeToggle";
import Hero from "./components/Hero";
import DropZone from "./components/DropZone";
import Spinner from "./components/Spinner";
import VideoPanel from "./components/VideoPanel";
import ThumbnailGrid from "./components/ThumbnailGrid";
import AboutUs from "./components/AboutUs";

export default function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {
    videoRef,
    canvasRef,
    videoFile,
    videoResolution,
    videoDuration,
    fileSize,
    isLoading,
    isCapturingStoryboard,
    thumbnails,
    currentThumbnailIndex,
    canUndo,
    canRedo,
    loadVideo,
    generateThumbnail,
    generateStoryboard,
    nudge,
    removeThumbnail,
    selectThumbnail,
    undo,
    redo,
    downloadCurrent,
    downloadAll,
  } = useThumbnailManager();

  return (
    <div className={`thumbnail-generator ${isDarkMode ? "dark-mode" : ""}`}>
      <ToastContainer position="bottom-right" theme={isDarkMode ? "dark" : "light"} />
      <header className="status-bar">
        <Hero />
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      </header>

      <DropZone onFileSelected={loadVideo} />
      {isLoading && <Spinner />}

      {videoFile && (
        <VideoPanel
          videoRef={videoRef}
          canvasRef={canvasRef}
          videoFile={videoFile}
          videoResolution={videoResolution}
          videoDuration={videoDuration}
          fileSize={fileSize}
          canUndo={canUndo}
          canRedo={canRedo}
          hasSelection={currentThumbnailIndex >= 0}
          hasThumbnails={thumbnails.length > 0}
          isCapturingStoryboard={isCapturingStoryboard}
          onGenerate={generateThumbnail}
          onGenerateStoryboard={generateStoryboard}
          onNudge={nudge}
          onUndo={undo}
          onRedo={redo}
          onRemove={removeThumbnail}
          onDownload={downloadCurrent}
          onDownloadAll={downloadAll}
        />
      )}

      <ThumbnailGrid
        thumbnails={thumbnails}
        currentThumbnailIndex={currentThumbnailIndex}
        onSelect={selectThumbnail}
      />

      <p className="frame-count">Frames captured: {thumbnails.length}</p>
      <hr className="separator" />
      <AboutUs />
    </div>
  );
}
