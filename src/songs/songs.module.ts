import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connections';

const mockSongsService = {
  findAll() {
    return [
      {
        id: 1,
        title: 'lasting lover',
        artists: [
          'sigla'
        ]
      }
    ];
  }
};

@Module({
  controllers: [SongsController],
  providers: [
    // standard providers
    SongsService,

    /* value provider */
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService
    // },
    {
      provide: 'CONNECTION',
      useValue: connection
    }

    /* class provider */
    // {
    //   provide: SongsService, 
    //   useClass: SongsService
    // }
  ]
})
export class SongsModule {}
