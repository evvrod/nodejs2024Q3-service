import { forwardRef, Module } from '@nestjs/common';
import { RelationService } from './relation.service';

import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavModule } from '../fav/fav.module';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavModule),
  ],
  providers: [RelationService],
  exports: [RelationService],
})
export class RelationModule {}