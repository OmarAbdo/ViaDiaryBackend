import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty()
  trackId: number;
  @ApiProperty({ required: false })
  title?: string;
  @ApiProperty({ required: false })
  description?: string;
  @ApiProperty()
  userId: number;
}
