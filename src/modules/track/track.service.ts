import { Injectable, Inject } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackStore } from './interfaces/track-store.interface';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TrackService {
  constructor(
    @Inject('ITrackStore') private storage: ITrackStore,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.storage.createTrack(createTrackDto);
  }

  async findAll() {
    return await this.storage.getAllTracks();
  }

  async findOne(id: string) {
    return await this.storage.getTrackById(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.storage.updateTrack(id, updateTrackDto);
  }

  async remove(id: string) {
    this.eventEmitter.emit('track.deleted', id);
    return await this.storage.deleteTrack(id);
  }

  @OnEvent('album.deleted')
  async handleAlbumDeleted(id: string, albumId: string) {
    await this.storage.removeAlbumReferences(albumId);
  }

  @OnEvent('artist.deleted')
  async handleArtistDeleted(id: string, artistId: string) {
    await this.storage.removeArtistReferences(artistId);
  }
}
