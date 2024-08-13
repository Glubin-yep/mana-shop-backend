import { DeliveryStatusDTO } from './delivery-status.dto';
import { UserEntity } from '../entities/user.entity';

export class UserInfoDTO {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  adress?: string;
  delivery?: DeliveryStatusDTO[];

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.adress = user.adress;
    this.delivery = user.delivery.map((delivery) => ({
      id: delivery.id,
      trackCode: delivery.trackCode,
      status: delivery.status,
      createdOn: delivery.createdOn,
    }));
  }
}
