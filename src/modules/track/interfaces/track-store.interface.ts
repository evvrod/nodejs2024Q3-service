import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export interface ITrackStore {
  getAllTracks: () => void;
  getTrackById: (id: string) => Track | undefined;
  createTrack: (createTrackDto: CreateTrackDto) => Track;
  updateTrack: (id: string, updateTrackDto: UpdateTrackDto) => Track;
  deleteTrack: (id: string) => void;
  removeArtistReferences: (artistId: string) => void;
  removeAlbumReferences: (albumId: string) => void;
}
