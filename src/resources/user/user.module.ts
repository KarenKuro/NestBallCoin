import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonusEntity, UserBonusEntity, UserEntity } from '@app/common/entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '@app/common/guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserBonusEntity, BonusEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
