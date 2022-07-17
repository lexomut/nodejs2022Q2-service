import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/types';
import { validate ,v4 as uuidv4 } from 'uuid';
import { AlbumCreateDTO, AlbumUpdateDto } from './album.dto';
import { InMemoryDB } from '../db';
import { TrackService } from '../track/track.service';
import { FavouritesService } from 'src/favourites/favourites.service';

@Injectable()
export class AlbumService {
    private readonly albums: Album[];
    constructor( @Inject(forwardRef(() => TrackService))
                  private trackService: TrackService,
                 @Inject(forwardRef(() => FavouritesService))
                 private favouritesService: FavouritesService) {
        this.albums = new InMemoryDB().albums;
    }
    
    async getAll(): Promise<Album[]> {
        return this.albums;
    }

    async getOnce(id: string): Promise<Album> {
        if (!validate(id)) {
            throw new BadRequestException("Album id isn't valid");
        }
        const album: Album = this.albums.find((album) => album.id === id);
        if (!album) {
            throw new NotFoundException('Album not found');
        }
        return album;
    }

    async create(albumDTO: AlbumCreateDTO) {
        const id = uuidv4();
        const album: Album = { id, ...albumDTO, };
        this.albums.push(album);
        return album;
    }



    async update(id: string, updateDTO: AlbumUpdateDto) {

        if (!validate(id)) {
            throw new BadRequestException("Album id isn't valid");
        }
        const index = this.albums.findIndex(
            (album) => album.id === id,
        );
        if (index<0) {
            throw new NotFoundException('Album not found');
        }
        const album =this.albums[index];
        const newAlbum: Album = {...album, id, ...updateDTO};
        this.albums[index] = newAlbum;
        return newAlbum;
    }

    async remove(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Album id isn't valid");
        }
        const index = this.albums.findIndex((album) => album.id === id,);
        if (index < 0) {
            throw new NotFoundException('Album not found');
        }
        this.albums.splice(index, 1);

        const tracks = await this.trackService.getAll();
        const track = tracks.find(track => track.albumId ===id);
        if (track) {
            await this.trackService.update(track.id, { albumId: null });
        }

        const favourites = await this.favouritesService.getAll();
        const finedItem = favourites.tracks.find(track => track.id === id);
        if (finedItem) {
            await this.favouritesService.removeTrack(id);
        }
    }
}
