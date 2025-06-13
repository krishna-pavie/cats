import { IsInt, IsOptional, IsPositive, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  age?: number;

  @IsOptional()
  @IsUrl()
  imgUrl?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  breedId?: number; // Ahora es breedId
}
