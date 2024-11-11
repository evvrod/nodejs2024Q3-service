import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AlbumService } from 'src/modules/album/album.service';
import { TrackService } from 'src/modules/track/track.service';
import { ArtistService } from 'src/modules/artist/artist.service';

@Injectable()
export class RelationService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
  ) {}

  removeArtistReferences(artistId: string) {
    this.albumService.removeArtistReferences(artistId);
    this.trackService.removeArtistReferences(artistId);
  }

  removeAlbumReferences(albumId: string) {
    this.trackService.removeAlbumReferences(albumId);
  }

  hasArtist(artistId: string) {
    const artist = this.artistService.findOne(artistId);
    return !!artist;
  }

  hasAlbum(albumId: string) {
    const album = this.albumService.findOne(albumId);
    return !!album;
  }

  hasTrack(trackId: string) {
    const track = this.trackService.findOne(trackId);
    return !!track;
  }

  findArtist(artistId: string) {
    return this.artistService.findOne(artistId);
  }

  findAlbum(albumId: string) {
    return this.albumService.findOne(albumId);
  }

  findTrack(trackId: string) {
    return this.trackService.findOne(trackId);
  }
}
