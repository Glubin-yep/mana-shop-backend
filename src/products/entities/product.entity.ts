import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { LaptopDetailsEntity } from './category-details/laptop-details.entity';
import { ComputerDetailsEntity } from './category-details/computer-details.entity';
import { SmartphoneDetailsEntity } from './category-details/smartphone-details.entity';
import { SoftwareDetailsEntity } from './category-details/software-details.entity';
import { AccessoriesDetailsEntity } from './category-details/accessories-details.entity';
import { SmartHomeDetailsEntity } from './category-details/smartHome-details.entity';
import { TVDetailsEntity } from './category-details/TV-details.entity';
import { KitchenDetailsEntity } from './category-details/kitchen-details.entity';
import { Category } from '@/enums/category';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  category: Category;

  @Column({ nullable: true })
  photoURL: string;

  @OneToOne(() => LaptopDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  laptopDetails: LaptopDetailsEntity;

  @OneToOne(() => ComputerDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  computerDetails: ComputerDetailsEntity;

  @OneToOne(() => SmartphoneDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  smartphoneDetails: SmartphoneDetailsEntity;

  @OneToOne(() => SoftwareDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  softwareDetails: SoftwareDetailsEntity;

  @OneToOne(() => AccessoriesDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  accessoriesDetails: AccessoriesDetailsEntity;

  @OneToOne(() => SmartHomeDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  smartHomeDetails: SmartHomeDetailsEntity;

  @OneToOne(() => TVDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  tvDetails: TVDetailsEntity;

  @OneToOne(() => KitchenDetailsEntity, (details) => details.product, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  kitchenDetails: KitchenDetailsEntity;
}
