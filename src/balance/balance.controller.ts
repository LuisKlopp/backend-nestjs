import { Controller, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getBalance() {
    return this.balanceService.getBalance();
  }

  @Get(':id')
  async getBalanceById(@Param('id', ParseIntPipe) id: number) {
    return this.balanceService.getBalanceById(id);
  }

  @Post(':id/increment-left')
  async incrementYes(@Param('id', ParseIntPipe) id: number) {
    return this.balanceService.incrementLeft(id);
  }

  @Post(':id/increment-right')
  async incrementNo(@Param('id', ParseIntPipe) id: number) {
    return this.balanceService.incrementRight(id);
  }
}
