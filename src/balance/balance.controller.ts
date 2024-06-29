import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}
  private readonly logger = new Logger(BalanceController.name);

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
    this.logger.log('API 요청');
    return this.balanceService.incrementLeft(id);
  }

  @Post(':id/increment-right')
  async incrementNo(@Param('id', ParseIntPipe) id: number) {
    return this.balanceService.incrementRight(id);
  }
}
