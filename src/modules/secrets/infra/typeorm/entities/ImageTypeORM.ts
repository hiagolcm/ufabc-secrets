import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ImageInterface from '../../../ImageInterface';
import SecretTypeORM from './SecreTypeORM';

@Entity('images')
class ImageTypeORM implements ImageInterface {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => SecretTypeORM, (secret) => secret.images)
  secret!: SecretTypeORM;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default ImageTypeORM;
