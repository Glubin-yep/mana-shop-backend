import { UserEntity } from '../entities/user.entity';

export class UserResponseDto {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  address: string | null;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.address = user.adress;
  }
}
