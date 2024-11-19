import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export interface ITrackStore {
  getAllTracks: () => Promise<Track[]>;
  getTrackById: (id: string) => Promise<Track | undefined>;
  createTrack: (createTrackDto: CreateTrackDto) => Promise<Track>;
  updateTrack: (id: string, updateTrackDto: UpdateTrackDto) => Promise<Track>;
  deleteTrack: (id: string) => Promise<void>;
  removeArtistReferences: (artistId: string) => Promise<void>;
  removeAlbumReferences: (albumId: string) => Promise<void>;
}
