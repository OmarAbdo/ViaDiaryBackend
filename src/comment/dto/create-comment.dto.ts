import { ApiProperty } from '@nestjs/swagger';
export class CreateCommentDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  trackId: number;
}
