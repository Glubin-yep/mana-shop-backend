import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product.entity';

@Entity('software_details')
export class SoftwareDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  term_of_the_license: string;

  @Column()
  type: string;

  @Column()
  Number_of_users: number;

  @OneToOne(() => ProductEntity, (product) => product.softwareDetails)
  product: ProductEntity;
}
