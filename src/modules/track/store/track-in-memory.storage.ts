import { Injectable, NotFoundException } from '@nestjs/common';

import { RelationService } from 'src/modules/relation/relation.service';
import { ITrackStore } from '../interfaces/track-store.interface';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/update-track.dto';
import { Track } from 'src/modules/track/entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackInMemoryStorage implements ITrackStore {
  private tracks: Track[] = [];

  constructor(private readonly relationService: RelationService) {}

  async getAllTracks() {
    return this.tracks;
  }

  async getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const { name, duration, artistId, albumId } = createTrackDto;

    if (artistId) {
      const artistExists = this.relationService.hasArtist(artistId);
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with id ${artistId} does not exist.`,
        );
      }
    }

    if (albumId) {
      const artistExists = this.relationService.hasAlbum(albumId);
      if (!artistExists) {
        throw new NotFoundException(
          `Album with id ${artistId} does not exist.`,
        );
      }
    }

    const newTrack: Track = {
      id: uuidv4(),
      name,
      duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };
    this.tracks.push(newTrack);

    return newTrack;
  }

  async updateTrack(id: string, updateArtistDto: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    const updatedArtist = {
      ...this.tracks[trackIndex],
      ...updateArtistDto,
    };
    this.tracks[trackIndex] = updatedArtist;
    return updatedArtist;
  }

  async deleteTrack(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.tracks.splice(trackIndex, 1);
  }

  async removeArtistReferences(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }

  async removeAlbumReferences(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }
}
