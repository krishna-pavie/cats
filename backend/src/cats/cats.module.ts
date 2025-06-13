import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from '../breeds/breeds.module';
import { BreedsService } from '../breeds/breeds.service';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), BreedsModule, UsersModule],
  controllers: [CatsController],
  providers: [CatsService, BreedsService],
})
export class CatsModule {}
