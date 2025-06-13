import { Role } from "../../common/enums/rol.enum";
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: Role;
    address: string;
    regionId: number;
}
