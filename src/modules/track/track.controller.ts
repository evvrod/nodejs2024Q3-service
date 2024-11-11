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
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackIdDto } from './dto/track-id.dto';
import { Track } from './entities/track.entity';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all tracks.',
    type: [Track],
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get a track by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The track ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The track details.',
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid track ID format.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with the specified ID not found.',
  })
  findOne(@Param() params: TrackIdDto) {
    const track = this.trackService.findOne(params.id);

    if (!track) {
      throw new NotFoundException(`Track with id ${params.id} not found`);
    }

    return track;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The track has been successfully created.',
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body.',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update track information' })
  @ApiParam({ name: 'id', type: String, description: 'The track ID' })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The track has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid track ID or request body.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with the specified ID not found.',
  })
  update(@Param() params: TrackIdDto, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a track' })
  @ApiParam({ name: 'id', type: String, description: 'The track ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The track has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid track ID format.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Track with the specified ID not found.',
  })
  remove(@Param() params: TrackIdDto) {
    return this.trackService.remove(params.id);
  }
}
