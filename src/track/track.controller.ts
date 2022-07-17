import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { Track } from 'src/types';
import { TrackCreateDTO, TrackUpdateDto } from './tracks.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Get()
    async getAll(): Promise<Track[]> {
        return await this.trackService.getAll();
    }

    @Get(':id')
    async getOnce(@Param('id') id: string): Promise<Track> {
        return await this.trackService.getOnce(id);
    }

    @Post()
    async create(@Body() trackCreate: TrackCreateDTO): Promise<Track> {
        return await this.trackService.create(trackCreate);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() trackUpdate: TrackUpdateDto) {
        return await this.trackService.update(id, trackUpdate);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return await this.trackService.remove(id);
    }


}
