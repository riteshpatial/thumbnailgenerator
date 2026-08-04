const pad = (n) => String(n).padStart(2, "0");

// Formats the stored "seconds.hundredths" string as a mm:ss.cc timecode
// for display -- purely cosmetic, the raw seconds value is still used
// for filenames elsewhere.
export function formatTimecode(secondsStr) {
  const totalSeconds = parseFloat(secondsStr) || 0;
  let minutes = Math.floor(totalSeconds / 60);
  let wholeSeconds = Math.floor(totalSeconds % 60);
  let centiseconds = Math.round((totalSeconds - Math.floor(totalSeconds)) * 100);

  if (centiseconds === 100) {
    centiseconds = 0;
    wholeSeconds += 1;
  }
  if (wholeSeconds === 60) {
    wholeSeconds = 0;
    minutes += 1;
  }

  return `${pad(minutes)}:${pad(wholeSeconds)}.${pad(centiseconds)}`;
}
