import { GetAllFavoritesResponseDto } from '../dto/get-all-favorites-response.dto';

export interface IFavStore {
  createFavoritesForUser(id: string): Promise<void>;

  getAllFavorites: (id: string) => Promise<GetAllFavoritesResponseDto>;

  addTrackToFavorites: (id: string, trackId: string) => Promise<void>;
  removeTrackFromFavorites: (id: string, trackId: string) => Promise<void>;

  addAlbumToFavorites: (id: string, albumId: string) => Promise<void>;
  removeAlbumFromFavorites: (id: string, albumId: string) => Promise<void>;

  addArtistToFavorites: (id: string, artistId: string) => Promise<void>;
  removeArtistFromFavorites: (id: string, artistId: string) => Promise<void>;

  hasArtistInFavorites: (id: string, artistId: string) => Promise<boolean>;
  hasAlbumInFavorites: (id: string, albumId: string) => Promise<boolean>;
  hasTrackInFavorites: (id: string, trackId: string) => Promise<boolean>;
}
