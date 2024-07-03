import { UserEntity } from '@app/common/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { AuthGuard } from '@app/common/guards';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [GameController],
  providers: [GameService, AuthGuard],
  exports: [],
})
export class GameModule {}
