import { Body, Controller, Get , Param, Patch, Post, Delete, Query, 
ParseIntPipe, ValidationPipe  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create-user-dto';
import { UpdateUserDto } from './DTO/update-user-dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService : UsersService) {}

    @Get() 
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role)
    }                               
    
    // @Get('intern')
    // findAllIntern(){
    // return [{}]
    // }  

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id : number ) {
        return this.userService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto : CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe ) id : number, @Body(ValidationPipe) updateUserDto : UpdateUserDto ) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe ) id : number ) {
        return this.userService.delete(id)
    }

}
