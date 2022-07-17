import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Album, Artist, AssociatedFavourites, Favourites, Track } from 'src/types';
import { InMemoryDB } from '../db';
import { validate } from 'uuid';

@Injectable()
export class FavouritesService {
    favourites: Favourites;

    constructor(@Inject(forwardRef(() => ArtistService))
                private artistService: ArtistService,
                @Inject(forwardRef(() => AlbumService))
                private albumService: AlbumService,
                @Inject(forwardRef(() => TrackService))
                private trackService: TrackService) {
        this.favourites = new InMemoryDB().favourites;
    }

    async getAll(): Promise<AssociatedFavourites> {
        const _albums = this.albumService.getAll().then(albums => albums.filter(item => item && this.favourites.albums.includes(item.id)));
        const _artists = this.artistService.getAll().then(artists => artists.filter(item => item && this.favourites.artists.includes(item.id)));
        const _tracks = this.trackService.getAll().then(tracks => tracks.filter(item => item && this.favourites.tracks.includes(item.id)));
        const [albums, tracks, artists ] = await Promise.all([_albums, _tracks, _artists]);
        return { albums, tracks, artists };
    }

    async addTrack(id: string) {
        if (!validate(id)) {
            throw new BadRequestException('Track id isn\'t validate');
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
            throw new BadRequestException('Album id isn\'t validate');
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
            throw new BadRequestException('Artist id isn\'t validate');
        }
        const artists = this.artistService.getAll();
        const artist = (await artists).find((artist) => artist.id === id);
        if (!artist) {
            throw new UnprocessableEntityException('Artist not found');
        }
        this.favourites.artists.push(id);
        return id;
    }

    async removeTrack(id: string) {
        console.log( id,this.favourites.tracks );
        if (!validate(id)) {
            throw new BadRequestException('Track id isn\'t validate');
        }
        const index = this.favourites.tracks.indexOf(id);
        if (index === -1) {
            throw new NotFoundException('Favourites not found');
        } else {
            console.log('else', index, id,this.favourites.tracks );
            this.favourites.tracks[index] = undefined;
            console.log('end', id,this.favourites.tracks );
        }

    }

    async removeAlbum(id: string) {
        if (!validate(id)) {
            throw new BadRequestException('Album id isn\'t validate');
        }
        const index = this.favourites.albums.findIndex(album => album === id);
        if (index === -1) {
            throw new NotFoundException('Album not found');
        } else {
            this.favourites.albums[index] = undefined;
        }
    }

    async removeArtist(id: string) {
        if (!validate(id)) {
            throw new BadRequestException('Artist id isn\'t validate');
        }
        const index = this.favourites.artists.findIndex(artist => artist === id);
        if (index === -1) {
            throw new NotFoundException('Artist not found');
        } else {
            this.favourites.artists[index] = undefined;
        }
    }
}
