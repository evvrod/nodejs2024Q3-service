import { Injectable, Inject } from '@nestjs/common';
import { IFavStore } from './interfaces/fav-store.interface';

@Injectable()
export class FavService {
  constructor(@Inject('IFavStore') private storage: IFavStore) {}

  findAll() {
    return this.storage.getAllFavorites();
  }

  hasArtistInFavorites(artistId: string) {
    return this.storage.hasArtistInFavorites(artistId);
  }

  hasAlbumInFavorites(albumId: string) {
    return this.storage.hasAlbumInFavorites(albumId);
  }

  hasTrackInFavorites(trackId: string) {
    return this.storage.hasTrackInFavorites(trackId);
  }

  addTrackToFavorites(id: string) {
    return this.storage.addTrackToFavorites(id);
  }

  removeTrackFromFavorites(id: string) {
    return this.storage.removeTrackFromFavorites(id);
  }

  addAlbumToFavorites(id: string) {
    return this.storage.addAlbumToFavorites(id);
  }

  removeAlbumFromFavorites(id: string) {
    return this.storage.removeAlbumFromFavorites(id);
  }

  addArtistToFavorites(id: string) {
    return this.storage.addArtistToFavorites(id);
  }

  removeArtistFromFavorites(id: string) {
    return this.storage.removeArtistFromFavorites(id);
  }
}
