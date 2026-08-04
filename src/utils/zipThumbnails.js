import JSZip from "jszip";
import { saveAs } from "file-saver";

// Appends -2, -3, ... to the filename when the same timestamp repeats,
// so thumbnails captured in the same second don't overwrite each other in the zip.
function buildFilename(thumbnail, usedNames) {
  const base = `thumbnail-${thumbnail.time}`;
  let name = `${base}.png`;
  let suffix = 2;
  while (usedNames.has(name)) {
    name = `${base}-${suffix}.png`;
    suffix += 1;
  }
  usedNames.add(name);
  return name;
}

export async function zipThumbnails(thumbnails, zipFilename = "thumbnails.zip") {
  const zip = new JSZip();
  const usedNames = new Set();

  thumbnails.forEach((thumbnail) => {
    const base64Data = thumbnail.data.replace(/^data:image\/png;base64,/, "");
    const filename = buildFilename(thumbnail, usedNames);
    zip.file(filename, base64Data, { base64: true });
  });

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, zipFilename);
}
