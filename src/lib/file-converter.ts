/**
 * Converts a browser File object to a Base64 data URL string
 */
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to data URL"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Parses uploaded files into a list of base64 page images
 */
export async function processUploadedFileToImages(file: File): Promise<string[]> {
  const dataUrl = await fileToDataUrl(file);
  // Returns image URL list (1 page for images, or dataUrl)
  return [dataUrl];
}
