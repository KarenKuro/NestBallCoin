import { SkinEntity, UserEntity, UserSkinEntity } from '@app/common/entities';
import { AuthGuard } from '@app/common/guards';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkinController } from './skin .controller';
import { SkinService } from './skin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSkinEntity, SkinEntity])],
  controllers: [SkinController],
  providers: [SkinService, AuthGuard],
})
export class SkinModule {}
