import { Injectable } from '@nestjs/common/decorators/core';
import { Album, Artist, Track, User } from './types';

@Injectable()
export class InMemoryDB {
    albums: Album[] = [];
    tracks: Track[] = [];
    artists: Artist[] = [];
    users: User[] = [];
    private static instance;

    constructor() {
        if (!InMemoryDB.instance) {
            InMemoryDB.instance = this;
        }
        return InMemoryDB.instance;
    }
}
