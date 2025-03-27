import imageCompression from "browser-image-compression";

const uploadImage = async (file) => {
  // Compress the image
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });

  const formData = new FormData();
  formData.append("file", compressedFile);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_ml_default);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_dcw1m1rak
    }/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.secure_url;
};

export { uploadImage };
