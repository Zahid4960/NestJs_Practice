import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {

    constructor(private songService: SongsService) {}

    @Get()
    findall() {
        return this.songService.findAll();
    }

    @Post()
    create() {
        return this.songService.create('Animals by Martin Garrix');
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
