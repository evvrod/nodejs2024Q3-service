import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { IArtistStore } from '../interfaces/artist-store.interface';
import { CreateArtistDto } from 'src/modules/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/modules/artist/dto/update-artist.dto';
import { Artist } from 'src/modules/artist/entities/artist.entity';

@Injectable()
export class ArtistInPostgresStorage implements IArtistStore {
  private artists: Artist[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async getAllArtists() {
    return this.prisma.artist.findMany(); // Используем Prisma для получения всех артистов
  }

  async getArtistById(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = await this.prisma.artist.create({
      data: {
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      },
    });
    return newArtist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const existingArtist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!existingArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    return updatedArtist;
  }

  async deleteArtist(id: string) {
    const existingArtist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!existingArtist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    await this.prisma.artist.delete({
      where: { id },
    });
  }
}
