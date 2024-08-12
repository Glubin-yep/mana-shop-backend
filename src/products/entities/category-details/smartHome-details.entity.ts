import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product.entity';

@Entity('smart_home_details')
export class SmartHomeDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_conection: string;

  @Column()
  wireless_standart: string;

  @Column()
  compatibility: string;

  @OneToOne(() => ProductEntity, (product) => product.smartHomeDetails)
  product: ProductEntity;
}
