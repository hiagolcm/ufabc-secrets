import multer from 'multer';
import { resolve } from 'path';

export const tmpFile = resolve(__dirname, '../../tmp');

var storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, tmpFile);
  },
  filename: function (_, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});

export const multerConfig: multer.Options = {
  storage,
  limits: { fileSize: 5e6 },
  fileFilter: (_, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
