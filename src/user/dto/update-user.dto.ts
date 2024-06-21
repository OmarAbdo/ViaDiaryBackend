import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiProperty()
  userId: number;
  @ApiProperty({ required: false })
  email: string;
  // @ApiProperty()
  // password: string; // should be a separate API
  @ApiProperty({ required: false })
  username: string;
}
