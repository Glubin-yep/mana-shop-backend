import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../../users/entities/user.entity';
import { ProductEntity } from '@/products/entities/product.entity';

@Entity('delivery')
export class DeliveryStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.delivery)
  user: UserEntity;

  @Column()
  trackCode: string;

  @Column()
  status: string;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @CreateDateColumn()
  createdOn: Date;
}
