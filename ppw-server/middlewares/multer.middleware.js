import path from 'path';
import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, done) => {
      done(null, file.originalname);
    },
  }),
  fileFilter: (req, file, done) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.pdf') {
      done(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }
    done(null, true);
  },
});

export default upload;
