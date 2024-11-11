import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumIdDto } from './dto/album-id.dto';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched all albums.',
    type: [Album],
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get an album by id' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The album id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The album has been successfully retrieved.',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with the given id not found.',
  })
  findOne(@Param() params: AlbumIdDto) {
    const album = this.albumService.findOne(params.id);

    if (!album) {
      throw new NotFoundException(`Album with id ${params.id} not found`);
    }

    return album;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a new album' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The album has been successfully created.',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. The body is missing required fields.',
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update album information' })
  @ApiParam({ name: 'id', type: String, description: 'The album id' })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The album has been successfully updated.',
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with the given id not found.',
  })
  update(@Param() params: AlbumIdDto, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Delete an album by id' })
  @ApiParam({ name: 'id', type: String, description: 'The album id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The album has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album with the given id not found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: AlbumIdDto) {
    return this.albumService.remove(params.id);
  }
}
