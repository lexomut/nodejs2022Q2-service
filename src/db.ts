import { Injectable } from '@nestjs/common/decorators/core';
import { Album, Artist, Favourites, Track, User } from './types';

@Injectable()
export class InMemoryDB {
    albums: Album[] = [];
    tracks: Track[] = [];
    artists: Artist[] = [];
    users: User[] = [];
    favourites : Favourites={albums:[],tracks:[],artists:[]}
    private static instance;

    constructor() {
        if (!InMemoryDB.instance) {
            InMemoryDB.instance = this;
        }
        return InMemoryDB.instance;
    }
}
