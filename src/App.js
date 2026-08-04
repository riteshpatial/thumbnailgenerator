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
    fileSize,
    isLoading,
    thumbnails,
    currentThumbnailIndex,
    canUndo,
    canRedo,
    loadVideo,
    generateThumbnail,
    removeThumbnail,
    selectThumbnail,
    undo,
    redo,
    downloadCurrent,
    downloadAll,
  } = useThumbnailManager();

  return (
    <div className={`thumbnail-generator ${isDarkMode ? "dark-mode" : ""}`}>
      <ToastContainer position="bottom-right" />
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      <Hero />

      <DropZone onFileSelected={loadVideo} />
      {isLoading && <Spinner />}

      {videoFile && (
        <VideoPanel
          videoRef={videoRef}
          canvasRef={canvasRef}
          videoFile={videoFile}
          videoResolution={videoResolution}
          fileSize={fileSize}
          canUndo={canUndo}
          canRedo={canRedo}
          hasSelection={currentThumbnailIndex >= 0}
          hasThumbnails={thumbnails.length > 0}
          onGenerate={generateThumbnail}
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

      <p>Total Thumbnails: {thumbnails.length}</p>
      <hr className="separator" />
      <AboutUs />
    </div>
  );
}
