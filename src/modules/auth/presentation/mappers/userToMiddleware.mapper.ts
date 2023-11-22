import { User } from "modules/users/domain";

interface UserMapped {
  id: string;
  email: string;
  name: string;
  lastname: string;
  phone: number;
  address: string;
}

export class UserToMiddleware {
  constructor() {}

  static create(userToMap: User): UserMapped {
    const userMapped: UserMapped = {
      id: userToMap.getId,
      email: userToMap.getEmail,
      name: userToMap.getName,
      lastname: userToMap.getLastname,
      phone: userToMap.getPhone,
      address: userToMap.getAddress,
    };
    return userMapped;
  }
}
