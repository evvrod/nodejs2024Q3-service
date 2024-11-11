import { forwardRef, Module } from '@nestjs/common';
import { RelationService } from './relation.service';

import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  providers: [RelationService],
  exports: [RelationService],
})
export class RelationModule {}
