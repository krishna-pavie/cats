import { IsEmail, IsEnum, IsNumber, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "../../common/enums/rol.enum";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsString()
    name?: string;

    @IsEnum(Role)
    @IsOptional()
    role: Role;

    @IsString()
    address: string;

    @IsNumber()
    regionId: number;
}
