import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonusEntity, UserBonusEntity } from '@app/common/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserBonusEntity, BonusEntity])],
  providers: [TasksService],
})
export class TasksModule {}
