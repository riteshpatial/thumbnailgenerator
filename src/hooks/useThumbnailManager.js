import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { formatFileSize } from "../utils/formatFileSize";
import { zipThumbnails } from "../utils/zipThumbnails";

const EMPTY_SNAPSHOT = { thumbnails: [], currentThumbnailIndex: -1 };

export function useThumbnailManager() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoResolution, setVideoResolution] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [thumbnails, setThumbnails] = useState([]);
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(-1);

  // History holds full snapshots so every mutating action (load/generate/remove)
  // is undo-able consistently, rather than only removals.
  const [historyState, setHistoryState] = useState({
    entries: [EMPTY_SNAPSHOT],
    index: 0,
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const objectUrlRef = useRef(null);
  const hasWarnedStorageRef = useRef(false);

  // Restore any previously saved thumbnails on first load.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("thumbnails");
      if (saved) {
        const loaded = JSON.parse(saved);
        setThumbnails(loaded);
        setHistoryState({
          entries: [{ thumbnails: loaded, currentThumbnailIndex: -1 }],
          index: 0,
        });
      }
    } catch {
      // Corrupted or unreadable data — start fresh instead of crashing.
    }
  }, []);

  // Persist thumbnails whenever they change. Base64 PNGs can exceed the
  // localStorage quota, so failures are caught instead of thrown.
  useEffect(() => {
    try {
      localStorage.setItem("thumbnails", JSON.stringify(thumbnails));
      hasWarnedStorageRef.current = false;
    } catch {
      if (!hasWarnedStorageRef.current) {
        hasWarnedStorageRef.current = true;
        toast.error("Couldn't save thumbnails locally — storage limit reached");
      }
    }
  }, [thumbnails]);

  // Revoke the video object URL on unmount to avoid leaking memory.
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const pushHistory = (snapshot) => {
    setHistoryState((prev) => {
      const truncated = prev.entries.slice(0, prev.index + 1);
      return { entries: [...truncated, snapshot], index: truncated.length };
    });
  };

  const applySnapshot = (snapshot, index) => {
    setThumbnails(snapshot.thumbnails);
    setCurrentThumbnailIndex(snapshot.currentThumbnailIndex);
    setHistoryState((prev) => ({ ...prev, index }));
  };

  const loadVideo = (file) => {
    if (!file || !file.type.startsWith("video")) {
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    setIsLoading(true);
    const videoURL = URL.createObjectURL(file);
    objectUrlRef.current = videoURL;

    setVideoFile(videoURL);
    setThumbnails([]);
    setCurrentThumbnailIndex(-1);
    setHistoryState({ entries: [EMPTY_SNAPSHOT], index: 0 });
    setFileSize(formatFileSize(file.size));

    const probeElement = document.createElement("video");
    probeElement.onloadedmetadata = () => {
      setVideoResolution(`${probeElement.videoWidth}x${probeElement.videoHeight}`);
      setIsLoading(false);
    };
    probeElement.onerror = () => {
      setIsLoading(false);
      setVideoFile(null);
      toast.error("Couldn't read that video file");
    };
    probeElement.src = videoURL;
  };

  const generateThumbnail = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    if (!videoElement || !canvasElement || videoElement.readyState < 3) {
      return;
    }

    const thumbnailWidth = 320;
    const aspectRatio = videoElement.videoHeight / videoElement.videoWidth;
    canvasElement.width = thumbnailWidth;
    canvasElement.height = thumbnailWidth * aspectRatio;

    const ctx = canvasElement.getContext("2d");
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    const newThumbnail = {
      data: canvasElement.toDataURL("image/png"),
      time: videoElement.currentTime.toFixed(2),
    };

    // Always append to the full list — truncating on the currently *viewed*
    // thumbnail would silently delete everything captured after it.
    const newThumbnails = [...thumbnails, newThumbnail];
    const newIndex = newThumbnails.length - 1;

    setThumbnails(newThumbnails);
    setCurrentThumbnailIndex(newIndex);
    pushHistory({ thumbnails: newThumbnails, currentThumbnailIndex: newIndex });
  };

  const removeThumbnail = () => {
    if (currentThumbnailIndex < 0) {
      return;
    }
    const updatedThumbnails = [...thumbnails];
    updatedThumbnails.splice(currentThumbnailIndex, 1);
    const newIndex = updatedThumbnails.length > 0 ? updatedThumbnails.length - 1 : -1;

    setThumbnails(updatedThumbnails);
    setCurrentThumbnailIndex(newIndex);
    pushHistory({ thumbnails: updatedThumbnails, currentThumbnailIndex: newIndex });
  };

  const selectThumbnail = (index) => setCurrentThumbnailIndex(index);

  const undo = () => {
    if (historyState.index > 0) {
      const newIndex = historyState.index - 1;
      applySnapshot(historyState.entries[newIndex], newIndex);
    }
  };

  const redo = () => {
    if (historyState.index < historyState.entries.length - 1) {
      const newIndex = historyState.index + 1;
      applySnapshot(historyState.entries[newIndex], newIndex);
    }
  };

  const downloadCurrent = () => {
    if (currentThumbnailIndex < 0) {
      return;
    }
    const current = thumbnails[currentThumbnailIndex];
    const link = document.createElement("a");
    link.href = current.data;
    link.download = `thumbnail-${current.time}.png`;
    link.click();
  };

  const downloadAll = async () => {
    if (thumbnails.length === 0) {
      return;
    }
    try {
      await zipThumbnails(thumbnails);
    } catch {
      toast.error("Couldn't build the thumbnails zip");
    }
  };

  return {
    videoRef,
    canvasRef,
    videoFile,
    videoResolution,
    fileSize,
    isLoading,
    thumbnails,
    currentThumbnailIndex,
    canUndo: historyState.index > 0,
    canRedo: historyState.index < historyState.entries.length - 1,
    loadVideo,
    generateThumbnail,
    removeThumbnail,
    selectThumbnail,
    undo,
    redo,
    downloadCurrent,
    downloadAll,
  };
}
