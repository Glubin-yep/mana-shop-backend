import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product.entity';

@Entity('tv_details')
export class TVDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  screenResolution: string;

  @Column()
  smartTV: boolean;

  @Column()
  matrix_type: string;

  @Column()
  OS: string;

  @OneToOne(() => ProductEntity, (product) => product.tvDetails)
  product: ProductEntity;
}
