import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dijifthbj",
  api_key: "164377533849664",
  api_secret: "6GAGHA5cL1pxw2eiytbBpAZXAhw",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_thumbnails",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

const upload = multer({ storage });

export default upload;
