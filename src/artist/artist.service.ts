import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from 'src/types';
import { validate, v4 as uuidv4 } from 'uuid';
import { ArtistCreateDTO, ArtistUpdateDto } from './artist.dto';
import { InMemoryDB } from '../db';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
    private readonly artists: Artist[];

    constructor(
        @Inject(forwardRef(() => AlbumService))
        private albumService: AlbumService,
        @Inject(forwardRef(() => TrackService))
        private trackService: TrackService) {
        this.artists = new InMemoryDB().artists;
    }

    async getAll(): Promise<Artist[]> {
        return this.artists;
    }

    async getOnce(id: string): Promise<Artist> {
        if (!validate(id)) {
            throw new BadRequestException('Artist id isn\'t valid');
        }
        const artist: Artist = this.artists.find((artist) => artist.id === id);
        if (!artist) {
            throw new NotFoundException('Artist not found');
        }
        return artist;
    }

    async create(artistDTO: ArtistCreateDTO) {
        const id = uuidv4();
        const artist: Artist = { id, ...artistDTO };
        this.artists.push(artist);
        return artist;
    }


    async update(id: string, updateDTO: ArtistUpdateDto) {
        if (!validate(id)) {
            throw new BadRequestException('Artist id isn\'t valid');
        }
        const index = this.artists.findIndex(
            (artist) => artist.id === id,
        );
        if (index < 0) {
            throw new NotFoundException('Artist not found');
        }
        const artist = this.artists[index];
        const newArtist: Artist = { ...artist, id, ...updateDTO };
        this.artists[index] = newArtist;
        return newArtist;
    }

    async remove(id: string) {
        if (!validate(id)) {
            throw new BadRequestException('Artist id isn\'t valid');
        }
        const index = this.artists.findIndex((artist) => artist.id === id);
        if (index < 0) {
            throw new NotFoundException('Artist not found');
        }
        this.artists.splice(index, 1);
        const albums= await this.albumService.getAll();
        const finedAlbum =albums.find(album => album.artistId===id);
        if (finedAlbum) {
            await this.albumService.update(finedAlbum.id,{artistId:null});
        }
        const tracks = await this.trackService.getAll();
        const finedTrack =tracks.find(track => track.artistId===id);
        if (finedTrack) {
            await this.trackService.update(finedTrack.id,{artistId:null});
        }
    }
}
