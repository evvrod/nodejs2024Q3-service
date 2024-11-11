import { Album } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export interface IAlbumStore {
  getAllAlbums: () => void;
  getAlbumById: (id: string) => Album | undefined;
  createAlbum: (createAlbumDto: CreateAlbumDto) => Album;
  updateAlbum: (id: string, updateAlbumDto: UpdateAlbumDto) => Album;
  deleteAlbum: (id: string) => void;
  hasAlbum: (id: string) => boolean;
  removeArtistReferences: (artistId: string) => void;
}
