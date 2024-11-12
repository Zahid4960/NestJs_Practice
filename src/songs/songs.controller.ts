import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {

    constructor(private songService: SongsService) {}

    @Get()
    findall() {
        try {
            return this.songService.findAll();
        } catch (e) {
            throw new HttpException(
                'Server error', 
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: e
                }
            )
        }
    }

    @Post()
    create(@Body() createSongDTO: CreateSongDTO) {
        return this.songService.create(createSongDTO);
    }

    @Get(':id')
    findOne() {
        return 'fetched song based on id';
    }

    @Put(':id')
    update() {
        return 'Update song based on id';
    }

    @Delete(':id')
    delete() {
        return 'Delete song based on id';
    }
}
