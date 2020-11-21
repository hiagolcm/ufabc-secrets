import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewResult } from '../../../../shared/types';
import SecretTypeORM from '../../../secrets/infra/typeorm/entities/SecreTypeORM';
import UserTypeORM from '../../../users/infra/typeorm/entities/UserTypeORM';
import ReviewInterface from '../../ReviewInterface';

@Entity('reviews')
class ReviewTypeORM implements ReviewInterface {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => SecretTypeORM)
  secret!: SecretTypeORM;

  @ManyToOne(() => UserTypeORM)
  user!: UserTypeORM;

  @Column('text')
  result!: ReviewResult;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default ReviewTypeORM;
