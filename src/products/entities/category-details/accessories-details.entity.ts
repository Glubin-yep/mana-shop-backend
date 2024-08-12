import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product.entity';

@Entity('accessories_details')
export class AccessoriesDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  compatibility: string;

  @OneToOne(() => ProductEntity, (product) => product.accessoriesDetails)
  product: ProductEntity;
}
