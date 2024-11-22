import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IAlbumStore } from '../interfaces/album-store.interface';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/modules/album/dto/update-album.dto';
import { Album } from 'src/modules/album/entities/album.entity';
import { RelationService } from 'src/modules/relation/relation.service';

@Injectable()
export class AlbumInPostgresStorage implements IAlbumStore {
  constructor(
    private readonly prisma: PrismaService,
    private relationService: RelationService,
  ) {}

  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(id: string): Promise<Album | null> {
    return this.prisma.album.findUnique({
      where: { id },
    });
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { name, year, artistId } = createAlbumDto;

    if (artistId) {
      const artistExists = this.relationService.hasArtist(artistId);
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with id ${artistId} does not exist.`,
        );
      }
    }

    return this.prisma.album.create({
      data: {
        name,
        year,
        artistId: artistId || null,
      },
    });
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    await this.prisma.album.delete({
      where: { id },
    });
  }

  async hasAlbum(id: string): Promise<boolean> {
    const album = await this.prisma.album.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!album;
  }

  async removeArtistReferences(id: string, artistId: string): Promise<void> {
    await this.prisma.album.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }
}
