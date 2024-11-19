import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { RelationService } from 'src/modules/relation/relation.service';
import { IFavStore } from '../interfaces/fav-store.interface';
import { Fav } from 'src/modules/fav/entities/fav.entity';

@Injectable()
export class FavInMemoryStorage implements IFavStore {
  private favorites: Fav = { artists: [], albums: [], tracks: [] };

  constructor(private readonly relationService: RelationService) {}

  async getAllFavorites() {
    const [artists, albums, tracks] = await Promise.all([
      Promise.all(
        this.favorites.artists.map((id) => this.relationService.findArtist(id)),
      ).then((result) => result.filter(Boolean)),
      Promise.all(
        this.favorites.albums.map((id) => this.relationService.findAlbum(id)),
      ).then((result) => result.filter(Boolean)),
      Promise.all(
        this.favorites.tracks.map((id) => this.relationService.findTrack(id)),
      ).then((result) => result.filter(Boolean)),
    ]);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async hasArtistInFavorites(artistId: string) {
    return this.favorites.artists.includes(artistId);
  }

  async hasAlbumInFavorites(albumId: string) {
    return this.favorites.albums.includes(albumId);
  }

  async hasTrackInFavorites(trackId: string) {
    return this.favorites.tracks.includes(trackId);
  }

  async addTrackToFavorites(trackId: string) {
    const track = await this.relationService.hasTrack(trackId);
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is not found`,
      );
    }
    this.favorites.tracks.push(trackId);
  }

  async removeTrackFromFavorites(trackId: string) {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index === -1)
      throw new NotFoundException(
        `Track with id ${trackId} is not in favorites`,
      );
    this.favorites.tracks.splice(index, 1);
  }

  async addAlbumToFavorites(albumId: string) {
    const album = await this.relationService.hasAlbum(albumId);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} is not found`,
      );
    }
    this.favorites.albums.push(albumId);
  }

  async removeAlbumFromFavorites(albumId: string) {
    const index = this.favorites.albums.indexOf(albumId);
    if (index === -1)
      throw new NotFoundException(
        `Album with id ${albumId} is not in favorites`,
      );
    this.favorites.albums.splice(index, 1);
  }

  async addArtistToFavorites(artistId: string) {
    const artist = await this.relationService.hasArtist(artistId);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} is not found`,
      );
    }
    this.favorites.artists.push(artistId);
  }

  async removeArtistFromFavorites(artistId: string) {
    const index = this.favorites.artists.indexOf(artistId);
    if (index === -1)
      throw new NotFoundException(
        `Artist with id ${artistId} is not in favorites`,
      );
    this.favorites.artists.splice(index, 1);
  }
}
