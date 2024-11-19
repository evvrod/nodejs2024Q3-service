import { GetAllFavoritesResponseDto } from '../dto/get-all-favorites-response.dto';

export interface IFavStore {
  getAllFavorites: () => Promise<GetAllFavoritesResponseDto>;

  addTrackToFavorites: (id: string) => Promise<void>;
  removeTrackFromFavorites: (id: string) => Promise<void>;

  addAlbumToFavorites: (id: string) => Promise<void>;
  removeAlbumFromFavorites: (id: string) => Promise<void>;

  addArtistToFavorites: (id: string) => Promise<void>;
  removeArtistFromFavorites: (id: string) => Promise<void>;

  hasArtistInFavorites: (artistId: string) => Promise<boolean>;
  hasAlbumInFavorites: (albumId: string) => Promise<boolean>;
  hasTrackInFavorites: (trackId: string) => Promise<boolean>;
}
