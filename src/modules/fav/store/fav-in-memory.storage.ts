import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IFavStore } from '../interfaces/fav-store.interface';
import { Fav } from 'src/modules/fav/entities/fav.entity';
import { RelationService } from 'src/modules/relation/relation.service';

@Injectable()
export class FavInMemoryStorage implements IFavStore {
  private favorites: { [key: string]: Fav } = {};

  constructor(private readonly relationService: RelationService) {}

  async createFavoritesForUser(id: string) {
    const existingFavorites = this.favorites[id];

    if (!existingFavorites) {
      this.favorites[id] = {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
  }

  async getAllFavorites(id: string) {
    const [artists, albums, tracks] = await Promise.all([
      Promise.all(
        this.favorites[id].artists.map((id) =>
          this.relationService.findArtist(id),
        ),
      ).then((result) => result.filter(Boolean)),
      Promise.all(
        this.favorites[id].albums.map((id) =>
          this.relationService.findAlbum(id),
        ),
      ).then((result) => result.filter(Boolean)),
      Promise.all(
        this.favorites[id].tracks.map((id) =>
          this.relationService.findTrack(id),
        ),
      ).then((result) => result.filter(Boolean)),
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async hasArtistInFavorites(id: string, artistId: string) {
    return this.favorites[id].artists.includes(artistId);
  }

  async hasAlbumInFavorites(id: string, albumId: string) {
    return this.favorites[id].albums.includes(albumId);
  }

  async hasTrackInFavorites(id: string, trackId: string) {
    return this.favorites[id].tracks.includes(trackId);
  }

  async addTrackToFavorites(id: string, trackId: string) {
    const track = await this.relationService.hasTrack(trackId);
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not found`,
      );
    }

    this.favorites[id].tracks.push(trackId);
  }

  async removeTrackFromFavorites(id: string, trackId: string) {
    const index = this.favorites[id].tracks.indexOf(trackId);
    if (index === -1)
      throw new NotFoundException(
        `Track with id ${trackId} is not in favorites`,
      );
    this.favorites[id].tracks.splice(index, 1);
  }

  async addAlbumToFavorites(id: string, albumId: string) {
    const album = await this.relationService.hasAlbum(albumId);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} is not found`,
      );
    }
    this.favorites[id].albums.push(albumId);
  }

  async removeAlbumFromFavorites(id: string, albumId: string) {
    const index = this.favorites[id].albums.indexOf(albumId);
    if (index === -1)
      throw new NotFoundException(
        `Album with id ${albumId} is not in favorites`,
      );
    this.favorites[id].albums.splice(index, 1);
  }

  async addArtistToFavorites(id: string, artistId: string) {
    const artist = await this.relationService.hasArtist(artistId);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} is not found`,
      );
    }

    this.favorites[id].artists.push(artistId);
  }

  async removeArtistFromFavorites(id: string, artistId: string) {
    const index = this.favorites[id].artists.indexOf(artistId);
    if (index === -1)
      throw new NotFoundException(
        `Artist with id ${artistId} is not in favorites`,
      );
    this.favorites[id].artists.splice(index, 1);
  }
}
