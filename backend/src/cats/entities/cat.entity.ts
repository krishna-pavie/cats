import { ManyToOne, Column, DeleteDateColumn, Entity, JoinColumn } from "typeorm";
import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Cat {

@Column({primary: true, generated: true})
id: number;

@Column()
name: string;

@Column()
age: number;

@DeleteDateColumn()
deleteAt: Date;

@ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true, // para que traiga las raza al hacer un findOne
}) 
breed: Breed;

@Column(({default: true}))
status: boolean;

@Column()
imgUrl: string;


@ManyToOne(() => User, {eager: true})
@JoinColumn({name: 'userEmail', referencedColumnName: 'email', })
user: User;


}
