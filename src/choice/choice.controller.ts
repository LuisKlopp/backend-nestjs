import { Controller, Param, Post, Get } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { Choice } from './entities/choice.entity';

@Controller('choice')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Get()
  async getChoices() {
    return this.choiceService.getChoices();
  }

  @Post(':id/increment-yes')
  async incrementYes(@Param('id') id: number): Promise<Choice> {
    return this.choiceService.incrementYes(id);
  }

  @Post(':id/increment-no')
  async incrementNo(@Param('id') id: number): Promise<Choice> {
    return this.choiceService.incrementNo(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Choice> {
    return this.choiceService.findOne(id);
  }
}
