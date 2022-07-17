import { PartialType } from '@nestjs/mapped-types/dist/partial-type.helper';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AlbumCreateDTO {
    @IsOptional()
    @IsUUID()
    artistId: string | null;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;

}
export class AlbumUpdateDto extends PartialType(AlbumCreateDTO) {}


