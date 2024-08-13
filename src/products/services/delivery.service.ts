import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ProductEntity } from '../entities/product.entity';
import { DeliveryStatusEntity } from '../entities/delivery-status/delivery-status.entity';
import { UsersService } from '@/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryStatusService {
  constructor(
    private userService: UsersService,
    @InjectRepository(DeliveryStatusEntity)
    private readonly deliveryStatusRepository: Repository<DeliveryStatusEntity>,
  ) {}

  async addToTrack(
    product: ProductEntity,
    userId: number,
  ): Promise<DeliveryStatusEntity> {
    const deliveryStatus = new DeliveryStatusEntity();
    deliveryStatus.user = await this.userService.findById(userId); // Fetch the user
    deliveryStatus.trackCode = this.generateTrackCode(); // Generate or assign a tracking code
    deliveryStatus.status = 'Processing'; // Set initial status
    deliveryStatus.product = product; // Associate the product

    // Save the delivery status
    await this.deliveryStatusRepository.save(deliveryStatus);

    return deliveryStatus;
  }

  private generateTrackCode(): string {
    return 'TRACK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
