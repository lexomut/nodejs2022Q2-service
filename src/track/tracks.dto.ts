import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class TrackCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsUUID()
    artistId: string | null;

    @IsOptional()
    @IsUUID()
    albumId: string | null;

    @IsNotEmpty()
    @IsNumber()
    duration: number;
}

export class TrackUpdateDto extends PartialType(TrackCreateDTO) {}


