import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/enums/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/enums/interfaces/user-active.interface';
import { IsEmail } from 'class-validator';
import { Public } from 'src/auth/decorators/roles.decorator';


@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Auth(Role.USER, Role.ADMIN)
  @Post()
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.create(createCatDto, user);
  }
  
  // @Auth(Role.USER, Role.ADMIN)
  // @Get()
  // findAll(@ActiveUser() user: UserActiveInterface) {
  //   return this.catsService.findAll(user);
  // }

  @Auth(Role.USER, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.findOne(id, user);
  }

  @Auth(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.update(id, updateCatDto, user);
  }

  @Auth(Role.USER, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.remove(id, user);
  }

  @Public()
  @Get()
  findAll(){
    return this.catsService.findAllPublic();
  }
  
}

