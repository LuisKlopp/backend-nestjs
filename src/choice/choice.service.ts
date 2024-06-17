import { Injectable } from '@nestjs/common';
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

  async incrementYes(id: number): Promise<Choice> {
    const choice = await this.choiceRepository.findOneBy({ id });
    choice.yesCounter += 1;
    return this.choiceRepository.save(choice);
  }

  async incrementNo(id: number): Promise<Choice> {
    const choice = await this.choiceRepository.findOneBy({ id });
    choice.noCounter += 1;
    return this.choiceRepository.save(choice);
  }

  async findOne(id: number): Promise<Choice> {
    return this.choiceRepository.findOneBy({ id });
  }
}
