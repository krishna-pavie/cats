import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
export declare class RegionController {
    private readonly regionService;
    constructor(regionService: RegionService);
    create(createRegionDto: CreateRegionDto): Promise<{
        message: string;
        data: CreateRegionDto & import("./entities/region.entity").Region;
    } | undefined>;
    findAll(): Promise<{
        message: string;
        data: import("./entities/region.entity").Region[];
    } | undefined>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./entities/region.entity").Region;
    } | undefined>;
    update(id: string, updateRegionDto: UpdateRegionDto): string;
    remove(id: string): string;
}
