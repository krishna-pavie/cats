import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { UserActiveInterface } from 'src/common/enums/interfaces/user-active.interface';
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    create(createCatDto: CreateCatDto, user: UserActiveInterface): Promise<{
        message: string;
        data: {
            userEmail: string;
            id: number;
            name: string;
            age: number;
            deleteAt: Date;
            breed: import("../breeds/entities/breed.entity").Breed;
            status: boolean;
            imgUrl: string;
            user: import("../users/entities/user.entity").User;
        };
    }>;
    findOne(id: number, user: UserActiveInterface): Promise<{
        message: string;
        data: import("./entities/cat.entity").Cat;
    } | undefined>;
    update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface): Promise<{
        message: string;
        data: import("typeorm").UpdateResult;
    } | undefined>;
    remove(id: number, user: UserActiveInterface): Promise<{
        message: string;
    } | undefined>;
    findAll(): Promise<import("./entities/cat.entity").Cat[]>;
}
