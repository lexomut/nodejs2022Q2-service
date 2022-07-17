import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
