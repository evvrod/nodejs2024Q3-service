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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistIdDto } from './dto/artist-id.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all artists.',
    type: [Artist],
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get artist by id' })
  @ApiParam({ name: 'id', type: String, description: 'The artist id (UUID)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Artist found successfully.',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with the given id not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid artist id (not uuid).',
  })
  findOne(@Param() params: ArtistIdDto) {
    const artist = this.artistService.findOne(params.id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${params.id} not found`);
    }

    return this.artistService.findOne(params.id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The artist has been successfully created.',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Missing required fields.',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update artist information' })
  @ApiParam({ name: 'id', type: String, description: 'The artist id (UUID)' })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The artist has been successfully updated.',
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid artist id (not uuid).',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with the given id not found.',
  })
  update(
    @Param() params: ArtistIdDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an artist by id' })
  @ApiParam({ name: 'id', type: String, description: 'The artist id (UUID)' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Artist has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Invalid artist id (not uuid).',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist with the given id not found.',
  })
  remove(@Param() params: ArtistIdDto) {
    return this.artistService.remove(params.id);
  }
}
