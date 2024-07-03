import { BonusEntity, UserBonusEntity, UserEntity } from '@app/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { UserService } from '../user';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserBonusEntity, BonusEntity]),
  ],
  controllers: [BonusController],
  providers: [BonusService, UserService],
})
export class BonusModule {}
