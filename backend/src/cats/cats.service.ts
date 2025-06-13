import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import Utils from '../utils/utils';
import { UserActiveInterface } from '../common/enums/interfaces/user-active.interface';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    try {
      // 1. Buscar el usuario por email (del token)
      const userEntity = await this.userRepository.findOneBy({
        email: user.email,
      });

      if (!userEntity) {
        throw new BadRequestException('Usuario no encontrado');
      }
      // 2. Buscar la raza por nombre (convertir string a ID)
      const breedEntity = await this.breedRepository.findOne({
        where: { name: ILike(createCatDto.breed) }, // Búsqueda case-insensitive
      });

      if (!breedEntity) {
        throw new BadRequestException(
          `Raza '${createCatDto.breed}' no encontrada`,
        );
      }
      const newCat = this.catRepository.create({
        ...createCatDto,
        breed: { id: breedEntity.id },
        user: userEntity,
      });

      const savedCat = await this.catRepository.save(newCat);

      return {
        message: 'Gato creado exitosamente',
        data: {
          ...savedCat,
          userEmail: userEntity.email, // Opcional: incluir email en respuesta
        },
      };
    } catch (error) {
      Utils.errorResponse(error);
      throw error; 
    }
  }
  async findAll(user: UserActiveInterface) {
  if (user.role === Role.ADMIN) {
    return await this.catRepository.find({ 
      relations: ['user', 'breed'] 
    });
  }

  return await this.catRepository.find({
    where: { user: { email: user.email } },
    relations: ['user', 'breed']
  });
}

  async findOne(id: number, user: UserActiveInterface) {
    try {
      const cat = await this.catRepository.findOneBy({ id });
      if (!cat) {
        throw new BadRequestException(
          'El gatito seleccionado no pudo ser encontrado',
        );
      }
      this.validateOwnership(cat, user);

      return {
        message: 'El gatito fue obtenido con éxito',
        data: cat,
      };
    } catch (error) {
      Utils.errorResponse(error);
    }
  }

  async update(
    id: number,
    updateCatDto: UpdateCatDto,
    user: UserActiveInterface,
  ) {
    try {
      let breedEntity;
      if (updateCatDto.breedId) {
        breedEntity = await this.validateBreed(updateCatDto.breedId);
      }
      const updated = await this.catRepository.update(id, {
        ...updateCatDto,
        breed: breedEntity ?? undefined,
      });
      return {
        message: 'El gato ha sido actualizado con éxito',
        data: updated,
      };
    } catch (error) {
      Utils.errorResponse({
        message: 'Error al actualizar el gato. Verifica los datos enviados',
        error,
      });
    }
  }

  async remove(id: number, user: UserActiveInterface) {
    try {
      const cat = await this.findOne(id, user);
      if (!cat) {
        throw new NotFoundException('No se encontró el gatito seleccionado');
      }
      await this.catRepository.softDelete(id);
      return {
        message: 'El gatito seleccionado ha sido eliminado correctamente',
      };
    } catch (error) {
      Utils.errorResponse(error);
    }
  }

  private async validateBreed(breedId: number): Promise<Breed> {
    try {
      const breed = await this.breedRepository.findOneBy({ id: breedId });

      if (!breed) {
        throw new BadRequestException('Raza no encontrada');
      }

      return breed;
    } catch (error) {
      Utils.errorResponse(error);
      throw error; // Re-lanzamos el error para que sea manejado por el llamador
    }
  }

  private validateOwnership(cat: Cat, user: UserActiveInterface) {
    if (!cat.user) {
      throw new UnauthorizedException('Gato sin dueño');
    }
    if(user.role !== Role.ADMIN && cat.user.email !== user.email) {
      throw new UnauthorizedException();
    }
  }

  findAllPublic(){
    return this.catRepository.find({
      relations: ['breed'],
      select: [
        'name',
        'age',
        'status',
        'imgUrl'
      ]
    });
  }
}

