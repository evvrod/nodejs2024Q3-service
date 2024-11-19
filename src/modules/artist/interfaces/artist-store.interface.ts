import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export interface IArtistStore {
  getAllArtists: () => Promise<Artist[]>;
  getArtistById: (id: string) => Promise<Artist | undefined>;
  createArtist: (createUserDto: CreateArtistDto) => Promise<Artist>;
  updateArtist: (
    id: string,
    updatePasswordDto: UpdateArtistDto,
  ) => Promise<Artist>;
  deleteArtist: (id: string) => Promise<void>;
}
