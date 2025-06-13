import { Role } from "../../common/enums/rol.enum";
export declare class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    role: Role;
    address: string;
    regionId: number;
}
