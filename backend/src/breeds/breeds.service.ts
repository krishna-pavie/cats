import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Breed } from './entities/breed.entity';
import Utils from '../utils/utils';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    try {
      const newBreed = await this.breedRepository.save(createBreedDto);
      return {
        message: 'La raza ha sido creada con éxito', data: newBreed,
      }
    } catch (error) {
      Utils.errorResponse(error);
    }
  }

  async findAll() {
    try {
      const response = await this.breedRepository.find();
      return {
        message: 'Todas las razas fueron obtenidas con exito!',
        data: response,
      };
    } catch (error) {
      Utils.errorResponse(error);
    }
  }

  async findOne(id: number) {
    try {
      const breed = await this.breedRepository.findOneBy({ id });
      if (!breed) {
        throw new BadRequestException('No se pudo encontrar la raza seleccionada')
      }
      return {
        message: 'La raza eleccionada ha sido obtenida con éxito',
        data: breed,
      };
    } catch (error) {
      Utils.errorResponse(error);
    }
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    try {
      const existingBreed = await this.findOne(id);
      if(!existingBreed) {
        throw new NotFoundException('No se encontró la raza seleccionada');
      }
      await this.breedRepository.update(id, updateBreedDto); 

      return {
        message: 'La raza seleccionada ha sido actualizada correctamente', 
        data: updateBreedDto,
      }
    } catch (error) {
      Utils.errorResponse(error);
    }
  }

  async remove(id: number) {
    try {
      const breed = await this.findOne(id); 
      if(!breed) {
        throw new NotFoundException('No se encontró la raza seleccionada');
      }
      await this.breedRepository.softDelete(id);
      return {
        message: 'La raza seleccionada ha sido eliminada correctamente'
      };
    } catch (error) {
      Utils.errorResponse(error);
    }
  }

  findAllPublic(){
    return this.breedRepository.find({
      select: [
        'id',
        'name',
       
      ]
    });
  }
}
