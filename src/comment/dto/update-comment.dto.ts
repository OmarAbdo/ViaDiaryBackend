import { ApiProperty } from '@nestjs/swagger';
export class UpdateCommentDto {
  @ApiProperty()
  commentId: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  trackId: number;
}
