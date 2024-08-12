import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product.entity';

@Entity('smartphone_details')
export class SmartphoneDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  camera: string;

  @Column()
  RAM: number;

  @Column()
  ROM: number;

  @Column()
  batteryCapacity: number;

  @Column()
  refresh_rate: number;

  @Column()
  sim_slot: number;

  @OneToOne(() => ProductEntity, (product) => product.smartphoneDetails)
  product: ProductEntity;
}
