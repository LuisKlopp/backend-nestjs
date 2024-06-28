import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './entities/balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
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

  async incrementLeft(id: number): Promise<Balance> {
    const balance = await this.getBalanceById(id);
    balance.leftCount += 1;
    console.log('d');
    return this.balanceRepository.save(balance);
  }

  async incrementRight(id: number): Promise<Balance> {
    const balance = await this.getBalanceById(id);
    balance.rightCount += 1;
    return this.balanceRepository.save(balance);
  }
}
