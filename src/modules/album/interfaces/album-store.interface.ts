import { Album } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export interface IAlbumStore {
  getAllAlbums: () => Promise<Album[]>;
  getAlbumById: (id: string) => Promise<Album | undefined>;
  createAlbum: (createAlbumDto: CreateAlbumDto) => Promise<Album>;
  updateAlbum: (id: string, updateAlbumDto: UpdateAlbumDto) => Promise<Album>;
  deleteAlbum: (id: string) => Promise<void>;
  hasAlbum: (id: string) => Promise<boolean>;
  removeArtistReferences: (id: string, artistId: string) => Promise<void>;
}
