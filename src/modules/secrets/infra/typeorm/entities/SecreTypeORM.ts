import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SecretStatusName } from '../../../../../shared/types';
import SecretInterface from '../../../SecretInterface';

@Entity('secrets')
class SecretTypeORM implements SecretInterface {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 280 })
  message!: string;

  @Column({ name: 'image_url', nullable: true })
  imageURL?: string;

  @Column({ type: 'text' })
  status!: SecretStatusName;

  @Column({ name: 'last_review_request', nullable: true })
  lastReviewRequiest?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default SecretTypeORM;
