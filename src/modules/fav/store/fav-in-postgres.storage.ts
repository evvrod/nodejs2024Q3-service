import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IFavStore } from '../interfaces/fav-store.interface';

@Injectable()
export class FavInPostgresStorage implements IFavStore {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const DEV_USER_ID = '1';
    await this.createFavoritesForUser(DEV_USER_ID);
  }

  async createFavoritesForUser(id: string) {
    const existingFavorites = await this.prisma.fav.findUnique({
      where: { idUser: id },
    });

    if (!existingFavorites) {
      const newFavorites = await this.prisma.fav.create({
        data: {
          idUser: id,
          artists: {
            connect: [],
          },
          albums: {
            connect: [],
          },
          tracks: {
            connect: [],
          },
        },
      });
      return newFavorites;
    }

    return existingFavorites;
  }

  async getAllFavorites() {
    const id = '1';
    const favorites = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (!favorites) {
      throw new NotFoundException(`Favorites for user with id ${id} not found`);
    }

    return favorites;
  }

  async hasArtistInFavorites(artistId: string) {
    const id = '1';

    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { artists: true },
    });

    return favorite?.artists.some((artist) => artist.id === artistId);
  }

  async hasAlbumInFavorites(albumId: string) {
    const id = '1';

    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { albums: true },
    });

    return favorite?.albums.some((album) => album.id === albumId);
  }

  async hasTrackInFavorites(trackId: string) {
    const id = '1';

    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { tracks: true },
    });

    return favorite?.tracks.some((track) => track.id === trackId);
  }

  async addTrackToFavorites(trackId: string) {
    const id = '1';

    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });

    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not found`,
      );
    }

    await this.prisma.fav.update({
      where: { idUser: id },
      data: {
        tracks: {
          connect: { id: trackId },
        },
      },
    });
  }

  async removeTrackFromFavorites(trackId: string) {
    const id = '1';

    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { tracks: true },
    });

    if (!favorite || !favorite.tracks.some((track) => track.id === trackId)) {
      throw new NotFoundException(
        `Track with id ${trackId} is not in favorites`,
      );
    }

    await this.prisma.fav.update({
      where: { idUser: id },
      data: {
        tracks: {
          disconnect: { id: trackId },
        },
      },
    });
  }

  async addAlbumToFavorites(albumId: string) {
    const id = '1';

    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });

    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} is not found`,
      );
    }

    await this.prisma.fav.update({
      where: { idUser: id },
      data: {
        albums: {
          connect: { id: albumId },
        },
      },
    });
  }

  async removeAlbumFromFavorites(albumId: string) {
    const id = '1';
    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { albums: true },
    });

    if (!favorite || !favorite.albums.some((album) => album.id === albumId)) {
      throw new NotFoundException(
        `Album with id ${albumId} is not in favorites`,
      );
    }

    await this.prisma.fav.update({
      where: { idUser: id },
      data: {
        albums: {
          disconnect: { id: albumId },
        },
      },
    });
  }

  async addArtistToFavorites(artistId: string) {
    const id = '1';

    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} is not found`,
      );
    }

    await this.prisma.fav.update({
      where: { idUser: id },
      data: {
        artists: {
          connect: { id: artistId },
        },
      },
    });
  }

  async removeArtistFromFavorites(artistId: string) {
    const id = '1';

    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { artists: true },
    });

    if (
      !favorite ||
      !favorite.artists.some((artist) => artist.id === artistId)
    ) {
      throw new NotFoundException(
        `Artist with id ${artistId} is not in favorites`,
      );
    }

    await this.prisma.fav.update({
      where: { idUser: id },
      data: {
        artists: {
          disconnect: { id: artistId },
        },
      },
    });
  }
}
