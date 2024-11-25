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

  async createFavoritesForUser(id: string) {
    const existingFavorites = await this.prisma.fav.findUnique({
      where: { idUser: id },
    });

    try {
      if (!existingFavorites) {
        const fav = await this.prisma.fav.create({
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
      }
    } catch {
      throw new UnprocessableEntityException(
        `Favorites for user with id ${id}could not be created`,
      );
    }
  }

  async getAllFavorites(id: string) {
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

  async hasArtistInFavorites(id: string, artistId: string) {
    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { artists: true },
    });

    return favorite?.artists.some((artist) => artist.id === artistId);
  }

  async hasAlbumInFavorites(id: string, albumId: string) {
    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { albums: true },
    });

    return favorite?.albums.some((album) => album.id === albumId);
  }

  async hasTrackInFavorites(id: string, trackId: string) {
    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { tracks: true },
    });

    return favorite?.tracks.some((track) => track.id === trackId);
  }

  async addTrackToFavorites(id: string, trackId: string) {
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

  async removeTrackFromFavorites(id: string, trackId: string) {
    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { tracks: true },
    });

    if (!favorite || !favorite.tracks.some((track) => track.id === trackId)) {
      return;
      // throw new NotFoundException(
      //   `Track with id ${trackId} is not in favorites`,
      // );
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

  async addAlbumToFavorites(id: string, albumId: string) {
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

  async removeAlbumFromFavorites(id: string, albumId: string) {
    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { albums: true },
    });

    if (!favorite || !favorite.albums.some((album) => album.id === albumId)) {
      return;
      // throw new NotFoundException(
      //   `Album with id ${albumId} is not in favorites`,
      // );
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

  async addArtistToFavorites(id: string, artistId: string) {
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

  async removeArtistFromFavorites(id: string, artistId: string) {
    const favorite = await this.prisma.fav.findUnique({
      where: { idUser: id },
      include: { artists: true },
    });

    if (
      !favorite ||
      !favorite.artists.some((artist) => artist.id === artistId)
    ) {
      return;
      // throw new NotFoundException(
      //   `Artist with id ${artistId} is not in favorites`,
      // );
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
