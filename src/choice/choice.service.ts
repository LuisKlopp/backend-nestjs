import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Choice } from './entities/choice.entity';
import * as Mutex from 'async-mutex';

const mutex = new Mutex.Mutex();

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
    private readonly dataSource: DataSource,
  ) {}

  async getChoices(): Promise<Choice[]> {
    return this.choiceRepository.find();
  }

  async getChoiceById(id: number): Promise<Choice> {
    const choice = await this.choiceRepository.findOne({ where: { id } });
    if (!choice) {
      throw new NotFoundException('Choice not found');
    }
    await this.choiceRepository.save(choice);
    return choice;
  }

  private async updateChoiceField(
    id: number,
    field: 'yesCount' | 'noCount',
  ): Promise<Choice> {
    return await mutex.runExclusive(async () => {
      return await this.dataSource.transaction(async (manager) => {
        const choice = await manager.findOne(Choice, { where: { id } });
        if (!choice) {
          throw new Error(`Choice with id ${id} not found`);
        }

        choice[field] += 1;
        return await manager.save(choice);
      });
    });
  }

  async incrementYes(id: number): Promise<Choice> {
    return this.updateChoiceField(id, 'yesCount');
  }

  async incrementNo(id: number): Promise<Choice> {
    return this.updateChoiceField(id, 'noCount');
  }
}
