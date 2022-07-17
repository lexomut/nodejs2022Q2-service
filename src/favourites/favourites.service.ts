import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { AssociatedFavourites, Favourites } from 'src/types';
import { InMemoryDB } from '../db';
import { validate  } from 'uuid';

@Injectable()
export class FavouritesService {
    private favourites: Favourites;
    constructor( @Inject(forwardRef(() => ArtistService))
                 private artistsService: ArtistService,
                 @Inject(forwardRef(() => AlbumService))
                 private albumService: AlbumService,
                 @Inject(forwardRef(() => TrackService))
                 private trackService: TrackService) {
        this.favourites = new InMemoryDB().favourites;
    }
    
    async getAll(): Promise<AssociatedFavourites> {
        const artists = await this.artistsService.getAll();
        const albums = await this.albumService.getAll();
        const tracks = await this.trackService.getAll();
        return { artists, albums, tracks };
    }

    async addTrack(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Track id isn't validate");
        }
        const tracks = this.trackService.getAll();
        const track = (await tracks).find((track) => track.id === id);
        if (!track) {
            throw new UnprocessableEntityException('Track not found');
        }
        this.favourites.tracks.push(id);
        return id;
    }

    async addAlbum(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Album id isn't validate");
        }
        const albums = this.albumService.getAll();
        const album = (await albums).find((album) => album.id === id);
        if (!album) {
            throw new UnprocessableEntityException('Album not found');
        }
        this.favourites.albums.push(id);
        return id;
    }

    async addArtist(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Artist id isn't validate");
        }
        const artists = this.artistsService.getAll();
        const artist = (await artists).find((artist) => artist.id === id);
        if (!artist) {
            throw new UnprocessableEntityException('Artist not found');
        }
        this.favourites.artists.push(id);
        return id;
    }
    async removeTrack(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Track id isn't validate");
        }
        const index = this.favourites.tracks.indexOf(id);
        if (index === -1) {
            throw new NotFoundException('Favourites not found');
        }
        this.favourites.tracks.splice(index, 1);
    }

    async removeAlbum(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Album id isn't validate");
        }
        const index = this.favourites.albums.indexOf(id);
        if (index === -1) {
            throw new NotFoundException('Album not found');
        }
        this.favourites.albums.splice(index, 1);
    }

    async removeArtist(id: string) {
        if (!validate(id)) {
            throw new BadRequestException("Artist id isn't validate");
        }
        const index = this.favourites.artists.findIndex(
            (artistId) => artistId === id,
        );
        if (index === -1) {
            throw new NotFoundException('Artist not found');
        }
        this.favourites.artists.splice(index, 1);
    }
}
