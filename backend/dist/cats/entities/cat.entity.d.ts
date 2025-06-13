import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
export declare class Cat {
    id: number;
    name: string;
    age: number;
    deleteAt: Date;
    breed: Breed;
    status: boolean;
    imgUrl: string;
    user: User;
}
