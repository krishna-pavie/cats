import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/enums/decorators/active-user.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

@Auth(Role.USER, Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

@Auth(Role.USER, Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Auth(Role.USER, Role.ADMIN)
  @Get('me')
  getProfile(@ActiveUser()user: {email: string}){
    return this.usersService.findOneByEmailWithRelations(user.email);
  }
  
@Auth(Role.USER, Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

@Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
