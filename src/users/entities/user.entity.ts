import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DeliveryStatusEntity } from '../../products/entities/delivery-status/delivery-status.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  OAuthGithubId: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  adress?: string;

  @OneToMany(() => DeliveryStatusEntity, (delivery) => delivery.user)
  delivery?: DeliveryStatusEntity[];
}
