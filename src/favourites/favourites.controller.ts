import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AssociatedFavourites } from 'src/types';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
    constructor(private favouritesService: FavouritesService) {
    }

    @Get()
    async findAll(): Promise<AssociatedFavourites> {
        return await this.favouritesService.getAll();
    }

    @Post('track/:id')
    async addTrack(@Param('id') id: string) {
        return await this.favouritesService.addTrack(id);
    }

    @Post('album/:id')
    async addAlbum(@Param('id') id: string) {
        return await this.favouritesService.addAlbum(id);
    }

    @Post('artist/:id')
    async addArtist(@Param('id') id: string) {
        return await this.favouritesService.addArtist(id);
    }
    @HttpCode(204)
    @Delete('track/:id')
    async removeTrack(@Param('id') id: string) {
        return await this.favouritesService.removeTrack(id);
    }
    @HttpCode(204)
    @Delete('album/:id')
    async removeAlbum(@Param('id') id: string) {
        return await this.favouritesService.removeAlbum(id);
    }
    @HttpCode(204)
    @Delete('artist/:id')
    async removeArtist(@Param('id') id: string) {
        return await this.favouritesService.removeArtist(id);
    }
}


