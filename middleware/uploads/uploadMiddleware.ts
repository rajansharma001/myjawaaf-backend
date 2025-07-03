import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


// Validate file type and size (max 5MB)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG and PNG files are allowed."), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter, limits:{ fileSize: 5 * 1024 * 1024 } }); //5mb
