import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AlbumService } from 'src/modules/album/album.service';
import { TrackService } from 'src/modules/track/track.service';
import { ArtistService } from 'src/modules/artist/artist.service';
import { FavService } from 'src/modules/fav/fav.service';

@Injectable()
export class RelationService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService)) private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService)) private trackService: TrackService,
    @Inject(forwardRef(() => FavService)) private favService: FavService,
  ) {}

  async removeArtistReferences(artistId: string) {
    await this.albumService.removeArtistReferences(artistId);
    await this.trackService.removeArtistReferences(artistId);
    if (await this.favService.hasArtistInFavorites(artistId)) {
      await this.favService.removeArtistFromFavorites(artistId);
    }
  }

  async removeAlbumReferences(albumId: string) {
    await this.trackService.removeAlbumReferences(albumId);
    if (await this.favService.hasAlbumInFavorites(albumId)) {
      await this.favService.removeAlbumFromFavorites(albumId);
    }
  }

  async removeTrackReferences(trackId: string) {
    if (await this.favService.hasTrackInFavorites(trackId)) {
      await this.favService.removeTrackFromFavorites(trackId);
    }
  }

  async hasArtist(artistId: string) {
    const artist = await this.artistService.findOne(artistId);
    return !!artist;
  }

  async hasAlbum(albumId: string) {
    const album = await this.albumService.findOne(albumId);
    return !!album;
  }

  async hasTrack(trackId: string) {
    const track = await this.trackService.findOne(trackId);
    return !!track;
  }

  async findArtist(artistId: string) {
    return await this.artistService.findOne(artistId);
  }

  async findAlbum(albumId: string) {
    return await this.albumService.findOne(albumId);
  }

  async findTrack(trackId: string) {
    return await this.trackService.findOne(trackId);
  }

  async handleTrackDeletion(trackId: string) {
    await this.favService.removeTrackFromFavorites(trackId);
  }
}
