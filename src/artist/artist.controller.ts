import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Artist } from 'src/types';
import { ArtistCreateDTO, ArtistUpdateDto } from './artist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) {}

    @Get()
    async getAll(): Promise<Artist[]> {
        return await this.artistService.getAll();
    }

    @Get(':id')
    async getOnce(@Param('id') id: string): Promise<Artist> {
        return await this.artistService.getOnce(id);
    }

    @Post()
    async create(@Body() artistCreate: ArtistCreateDTO): Promise<Artist> {
        return await this.artistService.create(artistCreate);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() artistUpdate: ArtistUpdateDto) {
        return await this.artistService.update(id, artistUpdate);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return await this.artistService.remove(id);
    }


}
