import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from 'typeorm';
import { Role } from '../../common/enums/rol.enum';
import { Region } from '../../region/entities/region.entity';
import { Cat } from '../../cats/entities/cat.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', default: Role.ADMIN, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => Region, (region) => region.users)
  region: Region;

  @OneToMany(() => Cat, (cat) => cat.user)
cats: Cat[];



  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      // Solo hashea si el campo password está modificado
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
