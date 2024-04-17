// create-comment.dto.ts
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  @IsNotEmpty()
  post_id: number;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
