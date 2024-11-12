import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {

    private readonly songs = [];

    create(song) {
        this.songs.push(song);
    }

    findAll() {
        throw new Error('Error while fetching song from db')
        return this.songs;
    }
}
