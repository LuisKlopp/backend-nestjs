import { IsString } from 'class-validator';

export class CreateHistoryAnswerDto {
  @IsString()
  message: string;
}
