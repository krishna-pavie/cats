import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Region } from 'src/region/entities/region.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { regionId, ...rest } = createUserDto;

    const region = await this.regionRepository.findOneBy({
      id: regionId,
    });

    if (!region) {
      throw new NotFoundException(`Región ${regionId} no encontrada`);
    }

    const user = this.userRepository.create({
      ...rest,
      region,
    });

    return this.userRepository.save(user);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }
  async findAll() {
    return this.userRepository.find({
      relations: ['region'], // Incluye la relación con Region
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['region'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`Usuario #${id} no encontrado`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id); // Reutiliza el findOne para validar
    return this.userRepository.remove(user);
  }

  async findOneByEmailWithRelations(email: string) {
  const user = await this.userRepository.findOne({
    where: { email },
    relations: ['region', 'cats'], 
  });

  if (!user) {
    throw new NotFoundException('Usuario no encontrado');
  }
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      region: user.region,
    },
    cats: user.cats,
  };
}

}


