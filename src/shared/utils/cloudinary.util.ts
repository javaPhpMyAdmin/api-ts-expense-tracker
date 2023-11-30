import cloudinary from "cloudinary";
import { envs } from "../infrastructure/envs";

export class CloudinaryUtility {
  constructor() {
    cloudinary.v2.config({
      cloud_name: envs.CLOUDINARY_CLOUD_NAME,
      api_key: envs.CLOUDINARY_API_KEY,
      api_secret: envs.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  public async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const result = await cloudinary.v2.uploader.upload(file.path);
      return result.secure_url;
    } catch (error) {
      console.log(error);

      throw new Error("IMPOSSIBLE TO UPLOAD THE IMAGE " + error);
    }
  }
}
