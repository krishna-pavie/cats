import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, (user) => user.region)
  users: User[];
}
