import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artists.entity';

@Injectable({
    scope: Scope.TRANSIENT
})
export class SongsService {

    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
    ) {}

    async create(songDto: CreateSongDTO): Promise<Song> {
        
        const song = new Song();
        song.title = songDto.title;
        song.releaseDate = songDto.releaseDate;
        song.duration = songDto.duration;
        song.lyrics = songDto.lyrics;

        // find all the artists on the based on ids
        const artists = await this.artistRepository.findByIds(songDto.artists);
        // set the relation with artists
        song.artists = artists;

        return await this.songsRepository.save(song);
    }

    async findAll(): Promise<Song[]> {
        return await this.songsRepository.find();
    }

    async findOne(id: number): Promise<Song> {
        return await this.songsRepository.findOneBy({ id });
    }

    // async update(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult> {
    //     return this.songsRepository.update(id, recordToUpdate);
    // }

    async remove(id: number): Promise<DeleteResult> {
        return this.songsRepository.delete(id);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        return await paginate<Song>(this.songsRepository, options);
    }
}
