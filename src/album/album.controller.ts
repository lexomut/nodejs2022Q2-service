import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Album } from 'src/types';
import { AlbumCreateDTO, AlbumUpdateDto } from './album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get()
    async getAll(): Promise<Album[]> {
        return await this.albumService.getAll();
    }

    @Get(':id')
    async getOnce(@Param('id') id: string): Promise<Album> {
        return await this.albumService.getOnce(id);
    }

    @Post()
    async create(@Body() albumCreate: AlbumCreateDTO): Promise<Album> {
        return await this.albumService.create(albumCreate);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() albumUpdate: AlbumUpdateDto) {
        return await this.albumService.update(id, albumUpdate);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return await this.albumService.remove(id);
    }


}
