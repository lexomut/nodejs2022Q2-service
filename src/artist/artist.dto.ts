import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArtistCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    grammy: boolean;
}

export class ArtistUpdateDto extends PartialType(ArtistCreateDTO) {}
