import { CustomError, Logger } from "../../../../../shared/domain";
import { User, UserRepository } from "../../../../../modules/users/domain";
import { CloudinaryUtility } from "../../../../../shared/utils";

const useCase = `[USE CASE UPLOAD IMAGE PROFILE]`;

const clouUtility = new CloudinaryUtility();

export class UploadProfileImage {
  constructor(
    private readonly cloudinaryUtility: CloudinaryUtility,
    private readonly userRepository: UserRepository,
    private readonly logger: Logger // private readonly cloudinaryUtility: CloudinaryUtility
  ) {}

  run = async (
    imageProfile: Express.Multer.File | undefined,
    email: string
  ): Promise<User | null> => {
    try {
      this.logger.info(`${useCase}- UPLOADING IMAGE PROFILE...`);
      if (!imageProfile) throw CustomError.badRequest("NO image to upload");

      // const imageUrl = await clouUtility.uploadImage(imageProfile!);

      const imageUrl =
        "https://res.cloudinary.com/dh27sb79z/image/upload/v1701369517/uy7luxxzy0wbwxcysmx6.png";

      const user = await this.userRepository.saveUserImage(email, imageUrl);

      if (!user) return null;
      console.log("USER GETTING TO ADD IMAGE", user);

      this.logger.info(`${useCase}- IMAGE PROFILE UPLOADED SUCCESSFULLY...`);
      return user;
    } catch (error) {
      this.logger.error(`${useCase}- ERROR TRYING TO UPLOAD IMAGE...` + error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  };
}
