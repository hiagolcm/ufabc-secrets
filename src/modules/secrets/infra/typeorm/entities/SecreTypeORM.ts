import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SecretStatusName } from '../../../../../shared/types';
import MediaInterface from '../../../MediaInterface';
import SecretInterface from '../../../SecretInterface';
import MediaTypeORM from './MediaTypeORM';

@Entity('secrets')
class SecretTypeORM implements SecretInterface {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 280 })
  message!: string;

  @ManyToMany(() => MediaTypeORM, { cascade: true })
  medias!: MediaInterface[];

  @Column({ type: 'text' })
  status!: SecretStatusName;

  @Column({ name: 'last_review_request', nullable: true })
  lastReviewRequiest?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  public getUrls() {
    const url =
      process.env.NODE_ENV === 'production'
        ? 'https://ufabc-secrets.s3-sa-east-1.amazonaws.com'
        : 'localhost:3333';

    return this.medias.map((media) => `${url}/${media.name}`);
  }
}

export default SecretTypeORM;
