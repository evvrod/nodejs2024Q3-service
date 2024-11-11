import { Module, forwardRef } from '@nestjs/common';
import { RelationModule } from 'src/modules/relation/relation.module';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumInMemoryStorage } from './store/album-in-memory.storage';

@Module({
  imports: [forwardRef(() => RelationModule)],
  controllers: [AlbumController],
  providers: [
    {
      provide: 'IAlbumStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? AlbumInMemoryStorage
          : AlbumInMemoryStorage,
    },
    AlbumService,
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
