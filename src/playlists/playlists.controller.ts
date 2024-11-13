import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlayListDTO } from './dto/create-playlist-dto';
import { PlayList } from './playlist.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(
    @Body() playListDTO: CreatePlayListDTO
  ): Promise<PlayList> {
    return this.playlistsService.create(playListDTO);
  }
}
