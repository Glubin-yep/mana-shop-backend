import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './products/entities/product.entity';
import { LaptopDetailsEntity } from './products/entities/category-details/laptop-details.entity';
import { ComputerDetailsEntity } from './products/entities/category-details/computer-details.entity';
import { SmartphoneDetailsEntity } from './products/entities/category-details/smartphone-details.entity';
import { SoftwareDetailsEntity } from './products/entities/category-details/software-details.entity';
import { AccessoriesDetailsEntity } from './products/entities/category-details/accessories-details.entity';
import { SmartHomeDetailsEntity } from './products/entities/category-details/smartHome-details.entity';
import { TVDetailsEntity } from './products/entities/category-details/TV-details.entity';
import { KitchenDetailsEntity } from './products/entities/category-details/kitchen-details.entity';
import { DeliveryStatusEntity } from './products/entities/delivery-status/delivery-status.entity';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserEntity,
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
      ],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // set to true in production for better security
      },
    }),
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
