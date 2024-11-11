import { Module, forwardRef } from '@nestjs/common';
import { RelationModule } from 'src/modules/relation/relation.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistInMemoryStorage } from './store/artist-in-memory.storage';

@Module({
  imports: [forwardRef(() => RelationModule)],
  controllers: [ArtistController],
  providers: [
    {
      provide: 'IArtistStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? ArtistInMemoryStorage
          : ArtistInMemoryStorage,
    },
    ArtistService,
  ],
  exports: [ArtistService],
})
export class ArtistModule {}
