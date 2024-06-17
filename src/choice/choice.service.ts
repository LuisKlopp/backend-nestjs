import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Choice } from './entities/choice.entity';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
  ) {}

  async getChoices(): Promise<Choice[]> {
    return this.choiceRepository.find();
  }

  async getChoiceById(id: number): Promise<Choice> {
    const choice = await this.choiceRepository.findOne({ where: { id } });
    if (!choice) {
      throw new NotFoundException('Choice not found');
    }
    choice.isClicked = true;
    await this.choiceRepository.save(choice);
    return choice;
  }

  async incrementYes(id: number): Promise<Choice> {
    const choice = await this.choiceRepository.findOneBy({ id });
    choice.yesCount += 1;
    return this.choiceRepository.save(choice);
  }

  async incrementNo(id: number): Promise<Choice> {
    const choice = await this.choiceRepository.findOneBy({ id });
    choice.noCount += 1;
    return this.choiceRepository.save(choice);
  }
}
