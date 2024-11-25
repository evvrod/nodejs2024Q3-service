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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserDto } from './dto/user.dto';
import { UserIdDto } from './dto/user-id.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched all users.',
    type: [UserDto],
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User ID in UUID format',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @UsePipes(new ValidationPipe())
  async findById(@Param() params: UserIdDto) {
    return await this.userService.findById(params.id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Login and Password are required',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({
    name: 'id',
    description: 'User ID in UUID format',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password updated successfully.',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden. Old password is incorrect.',
  })
  @UsePipes(new ValidationPipe())
  async update(
    @Param() params: UserIdDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.update(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User ID in UUID format',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: UserIdDto) {
    return await this.userService.remove(params.id);
  }
}
