import { BonusEntity, UserBonusEntity } from '@app/common/entities';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(UserBonusEntity)
    private readonly userBonusRepository: Repository<UserBonusEntity>,

    @InjectRepository(BonusEntity)
    private readonly bonusRepository: Repository<BonusEntity>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async accrueBonuses() {
    const userBonuses = await this.userBonusRepository.find({
      relations: ['bonus'],
    });

    userBonuses.forEach((userBonus) => {
      const count = userBonus.bonus.availableCountPerDay;
      const maxCount = userBonus.bonus.maxCount;
      if (userBonus.availableCount + count <= maxCount) {
        userBonus.availableCount += count;
        this.userBonusRepository.save(userBonus);
      } else {
        userBonus.availableCount = maxCount;
        this.userBonusRepository.save(userBonus);
      }
    });
  }
}
