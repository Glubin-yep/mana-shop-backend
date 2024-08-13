import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './entities/product.entity';
import { LaptopDetailsEntity } from './entities/category-details/laptop-details.entity';
import { ComputerDetailsEntity } from './entities/category-details/computer-details.entity';
import { SmartphoneDetailsEntity } from './entities/category-details/smartphone-details.entity';
import { SoftwareDetailsEntity } from './entities/category-details/software-details.entity';
import { AccessoriesDetailsEntity } from './entities/category-details/accessories-details.entity';
import { SmartHomeDetailsEntity } from './entities/category-details/smartHome-details.entity';
import { TVDetailsEntity } from './entities/category-details/TV-details.entity';
import { KitchenDetailsEntity } from './entities/category-details/kitchen-details.entity';
import { DeliveryStatusService } from './services/delivery.service';
import { DeliveryStatusEntity } from './entities/delivery-status/delivery-status.entity';
import { UsersService } from '@/users/users.service';
import { UserEntity } from '@/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      LaptopDetailsEntity,
      ComputerDetailsEntity,
      SmartphoneDetailsEntity,
      SoftwareDetailsEntity,
      AccessoriesDetailsEntity,
      SmartHomeDetailsEntity,
      TVDetailsEntity,
      KitchenDetailsEntity,
      DeliveryStatusEntity,
      UserEntity,
    ]),
  ],
  providers: [ProductsService, DeliveryStatusService, UsersService],
  controllers: [ProductsController],
})
export class ProductsModule {}
