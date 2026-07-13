type CompressImageOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: string;
};

export const compressImage = async (file: File, options: CompressImageOptions = {}): Promise<File> => {
  const { maxWidth = 512, maxHeight = 512, quality = 0.82, mimeType = "image/webp" } = options;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context unavailable");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mimeType, quality));

  if (!blob) {
    throw new Error("Image compression failed");
  }

  return new File([blob], "avatar.webp", { type: mimeType });
};
