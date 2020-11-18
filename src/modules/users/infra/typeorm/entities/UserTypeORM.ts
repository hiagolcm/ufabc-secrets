import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import UserInterface from '../../../UserInterface';

@Entity('users')
class UserTypeORM implements UserInterface {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'created_at' })
  updatedAt!: Date;
}

export default UserTypeORM;
