import { Module, forwardRef } from '@nestjs/common';
// import { ArtistModule } from 'src/modules/artist/artist.module';
// import { AlbumModule } from 'src/modules/album/album.module';
// import { TrackModule } from 'src/modules/track/track.module';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';
import { FavInMemoryStorage } from './store/fav-in-memory.storage';
import { FavInPostgresStorage } from './store/fav-in-postgres.storage';
import { RelationModule } from '../relation/relation.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => RelationModule), PrismaModule],
  controllers: [FavController],
  providers: [
    {
      provide: 'IFavStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? FavInMemoryStorage
          : FavInPostgresStorage,
    },
    FavService,
  ],
  exports: [FavService],
})
export class FavModule {}
