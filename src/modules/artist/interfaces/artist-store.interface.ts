import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export interface IArtistStore {
  getAllArtists: () => void;
  getArtistById: (id: string) => Artist | undefined;
  createArtist: (createUserDto: CreateArtistDto) => Artist;
  updateArtist: (id: string, updatePasswordDto: UpdateArtistDto) => Artist;
  deleteArtist: (id: string) => void;
}
