import { Injectable } from '@nestjs/common';
import { PlayList } from './playlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDTO } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(PlayList)
        private playListReop: Repository<PlayList>,

        @InjectRepository(Song)
        private songsRepo: Repository<Song>,

        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {}

    async create(playListDTO: CreatePlayListDTO): Promise<PlayList> {
        const playList = new PlayList();
        playList.name = playListDTO.name;

        const songs = await this.songsRepo.findByIds(playListDTO.songs);
        playList.songs = songs;

        const user = await this.userRepo.findOneBy({ id: playListDTO.user });
        playList.user = user;

        return await this.playListReop.save(playListDTO);
    }
}
