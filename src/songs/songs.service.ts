import { Injectable, Scope } from '@nestjs/common';

@Injectable({
    scope: Scope.TRANSIENT
})
export class SongsService {

    private readonly songs = [];

    create(song) {
        this.songs.push(song);
    }

    findAll() {
        // throw new Error('Error while fetching song from db')
        return this.songs;
    }
}
