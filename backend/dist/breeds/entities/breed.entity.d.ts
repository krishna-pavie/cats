import { Cat } from '../../cats/entities/cat.entity';
export declare class Breed {
    id: number;
    name: string;
    cats: Cat[];
    deletedAt?: Date;
}
