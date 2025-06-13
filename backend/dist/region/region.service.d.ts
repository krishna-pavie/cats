import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';
export declare class RegionService {
    private readonly regionRepository;
    constructor(regionRepository: Repository<Region>);
    create(CreateRegionDto: CreateRegionDto): Promise<{
        message: string;
        data: CreateRegionDto & Region;
    } | undefined>;
    findAll(): Promise<{
        message: string;
        data: Region[];
    } | undefined>;
    findOne(id: number): Promise<{
        message: string;
        data: Region;
    } | undefined>;
    update(id: number, updateRegionDto: UpdateRegionDto): string;
    remove(id: number): string;
}
