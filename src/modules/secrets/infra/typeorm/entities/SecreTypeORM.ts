import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SecretStatusName } from '../../../../../shared/types';
import ImageInterface from '../../../ImageInterface';
import SecretInterface from '../../../SecretInterface';
import ImageTypeORM from './ImageTypeORM';

@Entity('secrets')
class SecretTypeORM implements SecretInterface {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 280 })
  message!: string;

  @OneToMany(() => ImageTypeORM, (image) => image.secret, { cascade: true })
  images!: ImageInterface[];

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

    return this.images.map((image) => `${url}/${image.name}`);
  }
}

export default SecretTypeORM;
