import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    getProfile(user: {
        email: string;
    }): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            address: string;
            region: import("../region/entities/region.entity").Region;
        };
        cats: import("../cats/entities/cat.entity").Cat[];
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<import("./entities/user.entity").User>;
}
