import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
export declare class BreedsController {
    private readonly breedsService;
    constructor(breedsService: BreedsService);
    create(createBreedDto: CreateBreedDto): Promise<{
        message: string;
        data: CreateBreedDto & import("./entities/breed.entity").Breed;
    } | undefined>;
    findAllPublic(): Promise<import("./entities/breed.entity").Breed[]>;
    findAll(): Promise<{
        message: string;
        data: import("./entities/breed.entity").Breed[];
    } | undefined>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./entities/breed.entity").Breed;
    } | undefined>;
    update(id: string, updateBreedDto: UpdateBreedDto): Promise<{
        message: string;
        data: UpdateBreedDto;
    } | undefined>;
    remove(id: string): Promise<{
        message: string;
    } | undefined>;
}
