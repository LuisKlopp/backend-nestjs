import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ImageGameService } from './image-game.service';
import { ImageGame } from './entities/image-game.entity';
import { User } from '../users/entities/users.entity';

@Controller('image-game')
export class ImageGameController {
  constructor(private readonly imageGameService: ImageGameService) {}

  @Get()
  async findAllQuestions(): Promise<ImageGame[]> {
    return this.imageGameService.findAllQuestions();
  }

  @Get(':id')
  async findQuestionWithUsers(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ question: ImageGame; users: User[] }> {
    return this.imageGameService.findQuestionWithUsers(id);
  }
}
