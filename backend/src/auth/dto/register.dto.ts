import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "../../common/enums/rol.enum";

export class RegisterDto {

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;

    @IsString()
    address: string;

    @IsNumber()
    regionId: number;
    
}