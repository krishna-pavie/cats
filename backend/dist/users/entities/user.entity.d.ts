import { Role } from '../../common/enums/rol.enum';
import { Region } from '../../region/entities/region.entity';
import { Cat } from '../../cats/entities/cat.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    deletedAt: Date;
    address: string;
    region: Region;
    cats: Cat[];
    hashPassword(): Promise<void>;
}
