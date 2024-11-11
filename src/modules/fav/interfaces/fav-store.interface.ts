import { GetAllFavoritesResponseDto } from '../dto/get-all-favorites-response.dto';

export interface IFavStore {
  getAllFavorites: () => GetAllFavoritesResponseDto;

  addTrackToFavorites: (id: string) => void;
  removeTrackFromFavorites: (id: string) => void;

  addAlbumToFavorites: (id: string) => void;
  removeAlbumFromFavorites: (id: string) => void;

  addArtistToFavorites: (id: string) => void;
  removeArtistFromFavorites: (id: string) => void;

  hasArtistInFavorites: (artistId: string) => boolean;
  hasAlbumInFavorites: (albumId: string) => boolean;
  hasTrackInFavorites: (trackId: string) => boolean;
}
