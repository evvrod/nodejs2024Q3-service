import { Injectable, NotFoundException } from '@nestjs/common';
import { RelationService } from 'src/modules/relation/relation.service';

import { IArtistStore } from '../interfaces/artist-store.interface';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/modules/artist/dto/update-artist.dto';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistInMemoryStorage implements IArtistStore {
  private artists: Artist[] = [];

  constructor(private readonly relationService: RelationService) {}

  getAllArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    const artist = this.artists.find((user) => user.id === id);

    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    const updatedArtist = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };
    this.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  deleteArtist(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artists.splice(artistIndex, 1);
    this.relationService.removeArtistReferences(id);
  }
}
