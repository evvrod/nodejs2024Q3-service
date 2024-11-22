import { Injectable, Inject } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumStore } from './interfaces/album-store.interface';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('IAlbumStore') private storage: IAlbumStore,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.storage.createAlbum(createAlbumDto);
  }

  async findAll() {
    return await this.storage.getAllAlbums();
  }

  async findOne(id: string) {
    return await this.storage.getAlbumById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.storage.updateAlbum(id, updateAlbumDto);
  }

  async remove(id: string) {
    this.eventEmitter.emit('album.deleted', id);
    await this.storage.deleteAlbum(id);
  }

  @OnEvent('artist.deleted')
  async handleArtistDeleted(id: string, artistId: string) {
    await this.storage.removeArtistReferences(id, artistId);
  }
}
