import { Injectable, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistStore } from './interfaces/artist-store.interface';

import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('IArtistStore') private storage: IArtistStore,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateArtistDto) {
    return await this.storage.createArtist(createUserDto);
  }

  async findAll() {
    return await this.storage.getAllArtists();
  }

  async findOne(id: string) {
    return await this.storage.getArtistById(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.storage.updateArtist(id, updateArtistDto);
  }

  async remove(id: string) {
    this.eventEmitter.emit('artist.deleted', id);
    return await this.storage.deleteArtist(id);
  }
}
