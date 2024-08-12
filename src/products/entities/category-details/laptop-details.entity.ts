import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product.entity';

@Entity('laptop_details')
export class LaptopDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CPU: string;

  @Column()
  RAM: number;

  @Column()
  ROM: number;

  @Column()
  video_card: string;

  @Column()
  VRAM: number;

  @Column()
  refresh_rate: number;

  @OneToOne(() => ProductEntity, (product) => product.laptopDetails)
  product: ProductEntity;
}
