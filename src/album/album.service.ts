import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/types';
import { validate ,v4 as uuidv4 } from 'uuid';
import { AlbumCreateDTO, AlbumUpdateDto } from './album.dto';
import { InMemoryDB } from '../db';

@Injectable()
export class AlbumService {
    private readonly albums: Album[];
    constructor() {
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
        console.log('id',id,'updateDTO',updateDTO);
        console.log( this.albums);
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
    }
}
