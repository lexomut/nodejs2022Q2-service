import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class TrackCreateDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsUUID()
    readonly artistId: string | null;

    @IsOptional()
    @IsUUID()
    readonly albumId: string | null;

    @IsNotEmpty()
    @IsNumber()
    readonly duration: number;
}

export class TrackUpdateDto extends PartialType(TrackCreateDTO) {}


