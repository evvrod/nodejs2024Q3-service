import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackInMemoryStorage } from './store/track-in-memory.storage';
import { RelationModule } from '../relation/relation.module';

@Module({
  imports: [forwardRef(() => RelationModule)],
  controllers: [TrackController],
  providers: [
    {
      provide: 'ITrackStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? TrackInMemoryStorage
          : TrackInMemoryStorage,
    },
    TrackService,
  ],
  exports: [TrackService],
})
export class TrackModule {}
