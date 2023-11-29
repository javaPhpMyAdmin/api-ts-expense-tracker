import { CustomError, Logger } from "../../../../../shared/domain";
import { User, UserRepository } from "../../../../../modules/users/domain";

const useCase = `[USE CASE UPLOAD IMAGE PROFILE]`;

export class UploadProfileImage {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) // private readonly cloudinaryUtility: CloudinaryUtility
  {}

  async run(
    imageProfile: Express.Multer.File | undefined,
    userId: string
  ): Promise<User | null> {
    try {
      this.logger.info(`${useCase}- UPLOADING IMAGE PROFILE...`);
      return null;
    } catch (error) {
      this.logger.error(`${useCase}- ERROR TRYING TO UPLOAD IMAGE...`);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
