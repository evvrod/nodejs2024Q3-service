import { Injectable, Inject } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbumStore } from './interfaces/album-store.interface';

@Injectable()
export class AlbumService {
  constructor(@Inject('IAlbumStore') private storage: IAlbumStore) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.storage.createAlbum(createAlbumDto);
  }

  async findAll() {
    return await this.storage.getAllAlbums();
  }

  async findOne(id: string) {
    return await this.storage.getAlbumById(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.storage.updateAlbum(id, updateAlbumDto);
  }

  async remove(id: string) {
    await this.storage.deleteAlbum(id);
  }

  async removeArtistReferences(artistId: string) {
    await this.storage.removeArtistReferences(artistId);
  }
}
