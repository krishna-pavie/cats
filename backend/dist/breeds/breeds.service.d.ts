import { Repository } from 'typeorm';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';
export declare class BreedsService {
    private readonly breedRepository;
    constructor(breedRepository: Repository<Breed>);
    create(createBreedDto: CreateBreedDto): Promise<{
        message: string;
        data: CreateBreedDto & Breed;
    } | undefined>;
    findAll(): Promise<{
        message: string;
        data: Breed[];
    } | undefined>;
    findOne(id: number): Promise<{
        message: string;
        data: Breed;
    } | undefined>;
    update(id: number, updateBreedDto: UpdateBreedDto): Promise<{
        message: string;
        data: UpdateBreedDto;
    } | undefined>;
    remove(id: number): Promise<{
        message: string;
    } | undefined>;
    findAllPublic(): Promise<Breed[]>;
}
