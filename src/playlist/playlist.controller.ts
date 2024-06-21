import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Playlist } from './entities/playlist.entity';

@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiBody({ type: CreatePlaylistDto })
  @ApiResponse({
    status: 201,
    description: 'The playlist has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all playlists' })
  @ApiOkResponse({
    status: 200,
    description: 'Return all playlists.',
    type: [Playlist],
  })
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a playlist by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the playlist to retrieve',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Return the playlist.',
    type: Playlist,
  })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a playlist' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the playlist to update',
  })
  @ApiBody({ type: UpdatePlaylistDto })
  @ApiResponse({
    status: 200,
    description: 'The playlist has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a playlist' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the playlist to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The playlist has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  delete(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}
