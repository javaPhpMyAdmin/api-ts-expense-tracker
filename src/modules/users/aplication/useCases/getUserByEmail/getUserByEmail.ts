import { Logger } from '../../../../../shared/domain';
import { UserRepository } from '../../../domain';

export class GetUserByEmail {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}
}
