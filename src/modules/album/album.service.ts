import { Injectable, Inject } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumStore } from './interfaces/album-store.interface';

@Injectable()
export class AlbumService {
  constructor(@Inject('IAlbumStore') private storage: IAlbumStore) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.storage.getAllAlbums();
  }

  findOne(id: string) {
    return this.storage.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storage.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    this.storage.deleteAlbum(id);
  }

  removeArtistReferences(artistId: string) {
    this.storage.removeArtistReferences(artistId);
  }
}
