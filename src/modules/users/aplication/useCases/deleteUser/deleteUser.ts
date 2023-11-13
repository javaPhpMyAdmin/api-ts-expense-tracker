import { Logger } from '../../../../../shared/domain';
import { UserRepository } from '../../../domain';

export class DeleteUser {
  constructor(private userRepository: UserRepository, private logger: Logger) {}
}
