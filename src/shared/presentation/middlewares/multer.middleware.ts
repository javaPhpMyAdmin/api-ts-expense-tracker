import { Request } from "express";
import multer, { FileFilterCallback, Multer } from "multer";

export class MulterMiddleware {
  private storage: multer.StorageEngine;
  private fileFilter: unknown;

  constructor() {
    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "/uploads");
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

    this.fileFilter = (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
  }

  public upload(): ReturnType<Multer["single"]> {
    return multer({ storage: this.storage }).single("profileImage");
  }

  public setFilter(filterFunction: FileFilterCallback): void {
    this.fileFilter = filterFunction;
  }
}
