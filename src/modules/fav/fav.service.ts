import { Injectable, Inject } from '@nestjs/common';
import { IFavStore } from './interfaces/fav-store.interface';

@Injectable()
export class FavService {
  constructor(@Inject('IFavStore') private storage: IFavStore) {}

  async findAll() {
    return await this.storage.getAllFavorites();
  }

  async hasArtistInFavorites(artistId: string) {
    return await this.storage.hasArtistInFavorites(artistId);
  }

  async hasAlbumInFavorites(albumId: string) {
    return await this.storage.hasAlbumInFavorites(albumId);
  }

  async hasTrackInFavorites(trackId: string) {
    return await this.storage.hasTrackInFavorites(trackId);
  }

  async addTrackToFavorites(id: string) {
    return await this.storage.addTrackToFavorites(id);
  }

  async removeTrackFromFavorites(id: string) {
    return await this.storage.removeTrackFromFavorites(id);
  }

  async addAlbumToFavorites(id: string) {
    return await this.storage.addAlbumToFavorites(id);
  }

  async removeAlbumFromFavorites(id: string) {
    return await this.storage.removeAlbumFromFavorites(id);
  }

  async addArtistToFavorites(id: string) {
    return await this.storage.addArtistToFavorites(id);
  }

  async removeArtistFromFavorites(id: string) {
    return await this.storage.removeArtistFromFavorites(id);
  }
}
