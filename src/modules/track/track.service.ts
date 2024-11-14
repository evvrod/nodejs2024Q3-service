import { Injectable, Inject } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackStore } from './interfaces/track-store.interface';

@Injectable()
export class TrackService {
  constructor(@Inject('ITrackStore') private storage: ITrackStore) {}

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
    return await this.storage.deleteTrack(id);
  }

  async removeArtistReferences(artistId: string) {
    await this.storage.removeArtistReferences(artistId);
  }

  async removeAlbumReferences(albumId: string) {
    await this.storage.removeAlbumReferences(albumId);
  }
}
