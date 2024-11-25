import { Module, forwardRef } from '@nestjs/common';
import { RelationModule } from 'src/modules/relation/relation.module';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumInMemoryStorage } from './store/album-in-memory.storage';
import { AlbumInPostgresStorage } from './store/album-in-postgres.storage';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => RelationModule), PrismaModule],
  controllers: [AlbumController],
  providers: [
    {
      provide: 'IAlbumStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? AlbumInMemoryStorage
          : AlbumInPostgresStorage,
    },
    AlbumService,
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
