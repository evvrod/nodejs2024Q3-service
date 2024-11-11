import { Injectable, Inject } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackStore } from './interfaces/track-store.interface';

@Injectable()
export class TrackService {
  constructor(@Inject('ITrackStore') private storage: ITrackStore) {}

  create(createTrackDto: CreateTrackDto) {
    return this.storage.createTrack(createTrackDto);
  }

  findAll() {
    return this.storage.getAllTracks();
  }

  findOne(id: string) {
    return this.storage.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storage.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.storage.deleteTrack(id);
  }

  removeArtistReferences(artistId: string) {
    this.storage.removeArtistReferences(artistId);
  }

  removeAlbumReferences(albumId: string) {
    this.storage.removeAlbumReferences(albumId);
  }
}
