import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/profiles/img"));
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + "-" + originalName);
  },
});

const upload = multer({ storage: storage });

export default upload;