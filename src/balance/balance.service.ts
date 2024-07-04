import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Balance } from './entities/balance.entity';
import * as Mutex from 'async-mutex';

const mutex = new Mutex.Mutex();

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
    private readonly dataSource: DataSource,
  ) {}

  async getBalance(): Promise<Balance[]> {
    return this.balanceRepository.find();
  }

  async getBalanceById(id: number): Promise<Balance> {
    const balance = await this.balanceRepository.findOne({ where: { id } });
    if (!balance) {
      throw new NotFoundException('Balance not found');
    }
    await this.balanceRepository.save(balance);
    return balance;
  }

  async updateBalanceField(
    id: number,
    field: 'leftCount' | 'rightCount',
  ): Promise<Balance> {
    return await mutex.runExclusive(async () => {
      return await this.dataSource.transaction(async (manager) => {
        const balance = await manager.findOne(Balance, { where: { id } });
        if (!balance) {
          throw new Error(`Balance with id ${id} not found`);
        }

        balance[field] += 1;
        return await manager.save(balance);
      });
    });
  }

  async incrementLeft(id: number): Promise<Balance> {
    return this.updateBalanceField(id, 'leftCount');
  }

  async incrementRight(id: number): Promise<Balance> {
    return this.updateBalanceField(id, 'rightCount');
  }
}
