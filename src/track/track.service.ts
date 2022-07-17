
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/types';
import { validate ,v4 as uuidv4 } from 'uuid';
import { TrackCreateDTO, TrackUpdateDto } from './tracks.dto';
import { InMemoryDB } from '../db';

@Injectable()
export class TrackService {
    private readonly tracks: Track[];
    constructor() {
        this.tracks = new InMemoryDB().tracks;
    }

    async getAll(): Promise<Track[]> {
        return this.tracks;
    }

    async getOnce(id: string): Promise<Track> {
        if (!validate(id)) {
            throw new BadRequestException("Track id isn't valid");
        }
        const track: Track = this.tracks.find((track) => track.id === id);
        if (!track) {
            throw new NotFoundException('Track not found');
        }
        return track;
    }

    async create(trackDTO: TrackCreateDTO) {
        const id = uuidv4();
        const track: Track = { id, ...trackDTO, };
        this.tracks.push(track);
        return track;
    }



    async update(id: string, updateDTO: TrackUpdateDto) {
        console.log('id',id,'updateDTO',updateDTO);
        if (!validate(id)) {
            throw new BadRequestException("Track id isn't valid");
        }
        const index = this.tracks.findIndex(
            (track) => track.id === id,
        );
        if (index < 0) {
            throw new NotFoundException('Track not found');
        }
        const track =this.tracks[index];
        const newTrack: Track = {...track, id, ...updateDTO};
        console.log( this.tracks[index]);
        this.tracks[index] = newTrack;
        console.log('id',id,'updateDTO',updateDTO);
        console.log(newTrack);
        return newTrack;
    }

    async remove(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Track id isn't valid");
        }
        const index = this.tracks.findIndex((track) => track.id === id,);
        if (index < 0) {
            throw new NotFoundException('Track not found');
        }
        this.tracks.splice(index, 1);
    }
}
