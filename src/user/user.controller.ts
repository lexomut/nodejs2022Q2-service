import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
        this.userService= userService;
    }

    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Get(':id')
    getOnes(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }



    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }


    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}


