import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import SecretStatusInterface from '../../../SecretStatusInterface';

@Entity('secrets')
class SecretStatusTypeORM implements SecretStatusInterface {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;
}

export default SecretStatusTypeORM;
