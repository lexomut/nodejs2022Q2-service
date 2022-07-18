import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/types';
import { InMemoryDB } from '../db';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
    private users: User[];

    constructor() {
        this.users = new InMemoryDB().users;
    }

    async getAll(): Promise<User[]> {
        return this.users.map((user) => delPasswd(user));
    }

    async findOne(id: string): Promise<User> {
        if (!uuidValidate(id)) {
            throw new BadRequestException("User id isn't valid");
        }
        const user: User = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return delPasswd(user);
    }

    async create(userDTO: CreateUserDto) {
        const id = uuidv4();
        const createdAt = +new Date();
        const updatedAt = +new Date();
        const version = 1;
        const newUser: User = {
            id,
            ...userDTO,
            version,
            createdAt,
            updatedAt,
        };
        this.users.push(newUser);
        return delPasswd(newUser);
    }

    async remove(id: string) {
        if (!uuidValidate(id)) {
            throw new BadRequestException("User id isn't valid");
        }

        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }

        this.users.splice(index, 1);
    }

    async update(id: string, updateDTO: UpdateUserDto) {
        if (!uuidValidate(id)) {
            throw new BadRequestException("User id isn't valid");
        }
        const user: User = this.users.find((user, i) => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const index: number = this.users.findIndex(
            (user) => user.id === id,
        );

        if (updateDTO.oldPassword !== user.password) {
            throw new ForbiddenException('Old password is wrong');
        }

        const createdAt = this.users[index].createdAt;
        const login = this.users[index].login;
        const updatedAt = +new Date();
        const version = this.users[index].version + 1;
        const password = updateDTO.newPassword;
        const updatedUser: User = {
            id,
            login,
            version,
            createdAt,
            updatedAt,
            password,
        };
        this.users[index] = updatedUser;
        return delPasswd(updatedUser);
    }


}

function delPasswd(user:any) {
    const copy = {...user};
    delete copy.password;
    return copy;
}
