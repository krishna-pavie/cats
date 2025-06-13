import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';
import Utils from '../utils/utils';
@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async create(CreateRegionDto: CreateRegionDto) {
      try {
        const newRegion = await this.regionRepository.save(CreateRegionDto);
        return {
          message: 'La región ha sido creada con éxito', data: newRegion,
        }
      } catch (error) {
        Utils.errorResponse(error);
      }
    }

  async findAll(){
      try {
        const response = await this.regionRepository.find();
        return {
          message: 'Todas las regiones fueron obtenidas con exito!',
          data: response,
        };
      } catch (error) {
        Utils.errorResponse(error);
      }
    }

  async findOne(id: number) {
      try {
        const region = await this.regionRepository.findOneBy({ id });
        if (!region) {
          throw new BadRequestException('No se pudo encontrar la región seleccionada')
        }
        return {
          message: 'La región eleccionada ha sido obtenida con éxito',
          data: region,
        };
      } catch (error) {
        Utils.errorResponse(error);
      }
    }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
