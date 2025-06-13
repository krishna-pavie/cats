import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { UserActiveInterface } from '../common/enums/interfaces/user-active.interface';
import { User } from '../users/entities/user.entity';
export declare class CatsService {
    private readonly catRepository;
    private readonly breedRepository;
    private readonly userRepository;
    constructor(catRepository: Repository<Cat>, breedRepository: Repository<Breed>, userRepository: Repository<User>);
    create(createCatDto: CreateCatDto, user: UserActiveInterface): Promise<{
        message: string;
        data: {
            userEmail: string;
            id: number;
            name: string;
            age: number;
            deleteAt: Date;
            breed: Breed;
            status: boolean;
            imgUrl: string;
            user: User;
        };
    }>;
    findAll(user: UserActiveInterface): Promise<Cat[]>;
    findOne(id: number, user: UserActiveInterface): Promise<{
        message: string;
        data: Cat;
    } | undefined>;
    update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface): Promise<{
        message: string;
        data: import("typeorm").UpdateResult;
    } | undefined>;
    remove(id: number, user: UserActiveInterface): Promise<{
        message: string;
    } | undefined>;
    private validateBreed;
    private validateOwnership;
    findAllPublic(): Promise<Cat[]>;
}
