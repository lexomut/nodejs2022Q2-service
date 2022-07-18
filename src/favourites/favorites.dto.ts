import { IsArray, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class FavoritesDTO {
  @IsNotEmpty()
  @IsArray()
  readonly albums: [string];

  @IsNotEmpty()
  @IsArray()
  readonly artists: [string];

  @IsNotEmpty()
  @IsArray()
  readonly tracks: [string];
}

export class FavoriteUpdateDto extends PartialType(FavoritesDTO) {}
