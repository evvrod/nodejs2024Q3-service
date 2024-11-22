import { Injectable, Inject } from '@nestjs/common';
import { IFavStore } from './interfaces/fav-store.interface';

import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FavService {
  constructor(@Inject('IFavStore') private storage: IFavStore) {}

  async createFavorites(id: string) {
    await this.storage.createFavoritesForUser(id);
  }

  async findAll(id: string) {
    return await this.storage.getAllFavorites(id);
  }

  async hasArtistInFavorites(id: string, artistId: string) {
    return await this.storage.hasArtistInFavorites(id, artistId);
  }

  async hasAlbumInFavorites(id: string, albumId: string) {
    return await this.storage.hasAlbumInFavorites(id, albumId);
  }

  async hasTrackInFavorites(id: string, trackId: string) {
    return await this.storage.hasTrackInFavorites(id, trackId);
  }

  async addTrackToFavorites(id: string, trackId: string) {
    return await this.storage.addTrackToFavorites(id, trackId);
  }

  async removeTrackFromFavorites(id: string, trackId: string) {
    return await this.storage.removeTrackFromFavorites(id, trackId);
  }

  async addAlbumToFavorites(id: string, albumId: string) {
    return await this.storage.addAlbumToFavorites(id, albumId);
  }

  async removeAlbumFromFavorites(id: string, albumId: string) {
    return await this.storage.removeAlbumFromFavorites(id, albumId);
  }

  async addArtistToFavorites(id: string, artistId: string) {
    return await this.storage.addArtistToFavorites(id, artistId);
  }

  async removeArtistFromFavorites(id: string, artistId: string) {
    return await this.storage.removeArtistFromFavorites(id, artistId);
  }

  @OnEvent('track.deleted')
  async handleTrackDeleted(id: string, trackId: string) {
    await this.removeTrackFromFavorites(id, trackId);
  }

  @OnEvent('album.deleted')
  async handleAlbumDeleted(id: string, albumId: string) {
    await this.removeTrackFromFavorites(id, albumId);
  }

  @OnEvent('artist.deleted')
  async handleArtistDeleted(id: string, artistId: string) {
    await this.removeTrackFromFavorites(id, artistId);
  }

  @OnEvent('user.create')
  async handleCreateUser(id: string) {
    await this.createFavorites(id);
  }
}
