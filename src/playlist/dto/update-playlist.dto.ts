import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaylistDto {
  @ApiProperty()
  playlistId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  userId: number;
}
