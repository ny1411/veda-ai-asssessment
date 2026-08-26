/**
 * Utility to convert browser File objects (PDFs and Images) into Base64 image data URLs for OCR, AI analysis, and Canvas rendering.
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
 * Render a PDF File into an array of high-resolution JPEG Data URLs (one per page).
 */
export async function renderPdfToPageImages(file: File, scale = 2.0): Promise<string[]> {
  if (typeof window === "undefined") return [];

  try {
    const pdfjs = await import("pdfjs-dist");
    
    // Set standard CDN worker for pdfjs-dist
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version || "3.11.174"}/pdf.worker.min.js`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;
    const pageImages: string[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not create canvas 2D context");
      }

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      pageImages.push(dataUrl);
    }

    return pageImages;
  } catch (error) {
    console.warn("Client-side PDF rendering fallback:", error);
    // If pdfjs fails (e.g. worker CORS or unsupported environment), return single data URL
    const rawDataUrl = await fileToDataUrl(file);
    return [rawDataUrl];
  }
}

/**
 * Convert any uploaded file (PDF or Image) into a list of base64 page images.
 */
export async function processUploadedFileToImages(file: File): Promise<{
  pageImages: string[];
  pageCount: number;
}> {
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
    const images = await renderPdfToPageImages(file);
    return {
      pageImages: images,
      pageCount: images.length,
    };
  }

  // Single Image file (PNG, JPG, WEBP, etc.)
  const dataUrl = await fileToDataUrl(file);
  return {
    pageImages: [dataUrl],
    pageCount: 1,
  };
}
