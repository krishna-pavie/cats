import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Region } from 'src/region/entities/region.entity';
export declare class UsersService {
    private readonly userRepository;
    private readonly regionRepository;
    constructor(userRepository: Repository<User>, regionRepository: Repository<Region>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneByEmailWithPassword(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
    findOneByEmailWithRelations(email: string): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            address: string;
            region: Region;
        };
        cats: import("../cats/entities/cat.entity").Cat[];
    }>;
}
