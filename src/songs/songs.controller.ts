import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {

    @Get()
    findall() {
        return 'find all songs endpoint';
    }

    @Post()
    create() {
        return 'Create a new song';
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
