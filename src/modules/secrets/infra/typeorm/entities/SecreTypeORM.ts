import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import SecretInterface from '../../../SecretInterface';
import SecretStatusTypeORM from './SecretStatusTypeORM';

@Entity('secrets')
class SecretTypeORM implements SecretInterface {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  message!: string;

  @Column({ name: 'image_url' })
  imageUrl!: string;

  @ManyToOne(() => SecretStatusTypeORM, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'status_id' })
  @Index()
  status?: SecretStatusTypeORM;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export default SecretTypeORM;
