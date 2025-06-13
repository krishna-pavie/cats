import { IsInt, IsOptional, IsPositive, IsString, MinLength, IsUrl } from "class-validator";

export class CreateCatDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsInt()
    @IsPositive()
    age: number;

    @IsString()
    @IsOptional()
    breed: string;

    @IsUrl()
    imgUrl: string;

    @IsInt()
    @IsPositive()
    breedId: number;
    
}
