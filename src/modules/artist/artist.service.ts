import { Injectable, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistStore } from './interfaces/artist-store.interface';

@Injectable()
export class ArtistService {
  constructor(@Inject('IArtistStore') private storage: IArtistStore) {}

  create(createUserDto: CreateArtistDto) {
    return this.storage.createArtist(createUserDto);
  }

  findAll() {
    return this.storage.getAllArtists();
  }

  findOne(id: string) {
    return this.storage.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return this.storage.deleteArtist(id);
  }
}
