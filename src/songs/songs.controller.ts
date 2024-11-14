import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put, Query, Request, Scope, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connections';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artist-jwt-gurad';

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
    findall(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
    ): Promise<Pagination<Song>> {
        try {
            return this.songService.paginate({ page, limit });
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
    @UseGuards(ArtistJwtGuard)
    create(
        @Body() createSongDTO: CreateSongDTO,
        @Request() request
    ): Promise<Song> {
        console.log(request.user);
        return this.songService.create(createSongDTO);
    }

    @Get(':id')
    findOne(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        id: number
    ): Promise<Song> {
        return this.songService.findOne(id);
    }

    // @Patch(':id')
    // update(@Param('id', ParseIntPipe)id: number, @Body() updateSongDto: UpdateSongDTO): Promise<UpdateResult> {
    //     return this.songService.update(id, updateSongDto);
    // }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songService.remove(id);
    }
}
