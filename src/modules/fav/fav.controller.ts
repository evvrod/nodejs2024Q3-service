import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FavService } from './fav.service';
import { IdParamDto } from './dto/id-param.dto';
import { GetAllFavoritesResponseDto } from './dto/get-all-favorites-response.dto';

@ApiTags('Favorites')
@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all favorites' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all favorite items',
    type: GetAllFavoritesResponseDto,
  })
  findAll() {
    return this.favService.findAll();
  }

  @Post('track/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a track to favorites' })
  @ApiParam({ name: 'id', type: IdParamDto, description: 'Track ID' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Track added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid trackId format (not a UUID).',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Track with the specified ID does not exist.',
  })
  addTrackToFavorites(@Param() params: IdParamDto) {
    const { id } = params;
    this.favService.addTrackToFavorites(id);
    return { message: `Track with id ${id} added to favorites` };
  }

  @Delete('track/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a track from favorites' })
  @ApiParam({ name: 'id', type: IdParamDto, description: 'Track ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Track removed from favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid trackId format (not a UUID).',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with the specified ID not found in favorites.',
  })
  removeTrackFromFavorites(@Param() params: IdParamDto) {
    const { id } = params;
    this.favService.removeTrackFromFavorites(id);
  }

  @Post('album/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add an album to favorites' })
  @ApiParam({ name: 'id', type: IdParamDto, description: 'Album ID' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Album added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid albumId format (not a UUID).',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Album with the specified ID does not exist.',
  })
  addAlbumToFavorites(@Param() params: IdParamDto) {
    const { id } = params;
    this.favService.addAlbumToFavorites(id);
    return { message: `Album with id ${id} added to favorites` };
  }

  @Delete('album/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove an album from favorites' })
  @ApiParam({ name: 'id', type: IdParamDto, description: 'Album ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Album removed from favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid albumId format (not a UUID).',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with the specified ID not found in favorites.',
  })
  removeAlbumFromFavorites(@Param() params: IdParamDto) {
    const { id } = params;
    this.favService.removeAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add an artist to favorites' })
  @ApiParam({ name: 'id', type: IdParamDto, description: 'Artist ID' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Artist added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid artistId format (not a UUID).',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Artist with the specified ID does not exist.',
  })
  addArtistToFavorites(@Param() params: IdParamDto) {
    const { id } = params;
    this.favService.addArtistToFavorites(id);
    return { message: `Artist with id ${id} added to favorites` };
  }

  @Delete('artist/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove an artist from favorites' })
  @ApiParam({ name: 'id', type: IdParamDto, description: 'Artist ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist removed from favorites',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid artistId format (not a UUID).',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with the specified ID not found in favorites.',
  })
  removeArtistFromFavorites(@Param() params: IdParamDto) {
    const { id } = params;
    this.favService.removeArtistFromFavorites(id);
  }
}
