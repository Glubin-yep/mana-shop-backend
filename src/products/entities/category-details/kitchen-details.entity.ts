import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product.entity';

@Entity('kitchen_details')
export class KitchenDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @OneToOne(() => ProductEntity, (product) => product.kitchenDetails)
  product: ProductEntity;
}
