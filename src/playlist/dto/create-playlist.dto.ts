import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  userId: number;
}
