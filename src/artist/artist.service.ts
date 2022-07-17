
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/types';
import { validate ,v4 as uuidv4 } from 'uuid';
import { ArtistCreateDTO, ArtistUpdateDto } from './artist.dto';
import { InMemoryDB } from '../db';

@Injectable()
export class ArtistService {
    private readonly artists: Artist[];
    constructor() {
        this.artists = new InMemoryDB().artists;
    }

    async getAll(): Promise<Artist[]> {
        return this.artists;
    }

    async getOnce(id: string): Promise<Artist> {
        if (!validate(id)) {
            throw new BadRequestException("Artist id isn't valid");
        }
        const artist: Artist = this.artists.find((artist) => artist.id === id);
        if (!artist) {
            throw new NotFoundException('Artist not found');
        }
        return artist;
    }

    async create(artistDTO: ArtistCreateDTO) {
        const id = uuidv4();
        const artist: Artist = { id, ...artistDTO, };
        this.artists.push(artist);
        return artist;
    }



    async update(id: string, updateDTO: ArtistUpdateDto) {
        console.log('id',id,'updateDTO',updateDTO);
        console.log( this.artists);
        if (!validate(id)) {
            throw new BadRequestException("Artist id isn't valid");
        }
        const index = this.artists.findIndex(
            (artist) => artist.id === id,
        );
        if (index<0) {
            throw new NotFoundException('Artist not found');
        }
        const artist =this.artists[index];
        const newArtist: Artist = {...artist, id, ...updateDTO};
        this.artists[index] = newArtist;
        return newArtist;
    }

    async remove(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Artist id isn't valid");
        }
        const index = this.artists.findIndex((artist) => artist.id === id,);
        if (index < 0) {
            throw new NotFoundException('Artist not found');
        }
        this.artists.splice(index, 1);
    }
}
