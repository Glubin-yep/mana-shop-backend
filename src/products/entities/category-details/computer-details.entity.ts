import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product.entity';

@Entity('computer_details')
export class ComputerDetailsEntity {
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
  RAM_version: string;

  @OneToOne(() => ProductEntity, (product) => product.computerDetails)
  product: ProductEntity;
}
