import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackInMemoryStorage } from './store/track-in-memory.storage';
import { TrackInPostgresStorage } from './store/track-in-postgres.storage';
import { RelationModule } from '../relation/relation.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => RelationModule), PrismaModule],
  controllers: [TrackController],
  providers: [
    {
      provide: 'ITrackStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? TrackInMemoryStorage
          : TrackInPostgresStorage,
    },
    TrackService,
  ],
  exports: [TrackService],
})
export class TrackModule {}
