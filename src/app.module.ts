import { Module } from '@nestjs/common';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { FavouritesController } from './favourites/favourites.controller';
import { TrackController } from './track/track.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TrackService } from './track/track.service';
import { FavouritesService } from './favourites/favourites.service';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavouritesModule } from './favourites/favourites.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [AlbumModule, ArtistModule, FavouritesModule, TrackModule, UserModule],
    controllers: [AlbumController, ArtistController, FavouritesController, TrackController, UserController],
    providers: [UserService, TrackService, FavouritesService, ArtistService, AlbumService],
})
export class AppModule {
}
