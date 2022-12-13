import { Body, Controller, Get, Post, Patch, Render, Param } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    @Render('index')
    root(){
        return{
            message: 'Hello World',
        };
    }

    @Get('coba')
    getUser(){
        return this.userService.getUser();
    }

    @Post()
    createUser(@Body() request: CreateUserDto){
        return this.userService.createUser(request);
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() request: CreateUserDto) {
        return this.userService.updateUser(+id, request);
    }
}
