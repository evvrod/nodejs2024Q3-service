import { Injectable, NotFoundException } from '@nestjs/common';
import { RelationService } from 'src/modules/relation/relation.service';
import { IAlbumStore } from '../interfaces/album-store.interface';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/modules/album/dto/update-album.dto';
import { Album } from 'src/modules/album/entities/album.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumInMemoryStorage implements IAlbumStore {
  private albums: Album[] = [];

  constructor(private readonly relationService: RelationService) {}

  async getAllAlbums() {
    return this.albums;
  }

  async getAlbumById(id: string) {
    const album = this.albums.find((album) => album.id === id);

    return album;
  }

  async hasAlbum(id: string) {
    return this.albums.some((album) => album.id === id);
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;

    if (artistId) {
      const artistExists = this.relationService.hasArtist(artistId);
      if (!artistExists) {
        throw new NotFoundException(
          `Artist with id ${artistId} does not exist.`,
        );
      }
    }

    const newAlbum: Album = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    };
    this.albums.push(newAlbum);

    return newAlbum;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    const updatedAlbum = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };

    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.albums.splice(albumIndex, 1);
    await this.relationService.removeAlbumReferences(id);
  }

  async removeArtistReferences(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
