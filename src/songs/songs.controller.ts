import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connections';

@Controller({
    path: 'songs',
    scope: Scope.REQUEST
})
export class SongsController {

    constructor(
        private songService: SongsService,
        @Inject('CONNECTION')
        private connection: Connection
    ) {
        console.log(`THIS IS THE CONNECTION STRING ${this.connection.CONNECTION_STRING}`);
    }

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
    findOne(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        id: number
    ) {
        return `fetched song based on ${typeof id}`;
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
