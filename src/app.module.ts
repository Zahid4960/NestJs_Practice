import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artists.entity';
import { User } from './users/user.entity';
import { PlayList } from './playlists/playlist.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        database: 'spotify_clone',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '!@#DreamOnline123',
        entities: [Song, Artist, User, PlayList],
        synchronize: true
      }),
    SongsModule,
    PlaylistsModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      }
    }
  ],
})
export class AppModule implements NestModule{
  constructor(private dataSource: DataSource) {
    console.log('dbName ', dataSource.driver.database);
  }

  configure(consumer: MiddlewareConsumer) {
    // Option - 1
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); 

    // Option - 2
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST});

    // Option - 3
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
