import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/prisma.service'; // Подключаем PrismaService
import { ITrackStore } from '../interfaces/track-store.interface';
import { CreateTrackDto } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/modules/track/dto/update-track.dto';

@Injectable()
export class TrackInPostgresStorage implements ITrackStore {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const { name, duration, artistId, albumId } = createTrackDto;

    if (artistId) {
      const artistExists = await this.prisma.artist.findUnique({
        where: { id: artistId },
      });
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with id ${artistId} does not exist.`,
        );
      }
    }

    if (albumId) {
      const albumExists = await this.prisma.album.findUnique({
        where: { id: albumId },
      });
      if (!albumExists) {
        throw new NotFoundException(`Album with id ${albumId} does not exist.`);
      }
    }

    const newTrack = await this.prisma.track.create({
      data: {
        name,
        duration,
        artistId: artistId || null,
        albumId: albumId || null,
      },
    });

    return newTrack;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return updatedTrack;
  }

  async deleteTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    await this.prisma.track.delete({
      where: { id },
    });
  }

  async removeArtistReferences(artistId: string) {
    await this.prisma.track.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }

  async removeAlbumReferences(albumId: string) {
    await this.prisma.track.updateMany({
      where: { albumId },
      data: { albumId: null },
    });
  }
}
