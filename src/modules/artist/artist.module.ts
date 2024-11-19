import { Module, forwardRef } from '@nestjs/common';
import { RelationModule } from 'src/modules/relation/relation.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistInMemoryStorage } from './store/artist-in-memory.storage';
import { ArtistInPostgresStorage } from './store/artist-in-postgres.storage';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => RelationModule), PrismaModule],
  controllers: [ArtistController],
  providers: [
    {
      provide: 'IArtistStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? ArtistInMemoryStorage
          : ArtistInPostgresStorage,
    },
    ArtistService,
  ],
  exports: [ArtistService],
})
export class ArtistModule {}
