import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkinService } from './skin.service';
import { IUser } from '@app/common/models';
import { User } from '@app/common/decorators';
import { AuthGuard } from '@app/common/guards';
import { SkinDTO, SkinIdDTO } from './dto';

@UseGuards(AuthGuard)
@Controller('skins')
export class SkinController {
  constructor(private readonly skinService: SkinService) {}

  @Get()
  async getUserAllSkins(@User() currentUser: IUser): Promise<SkinDTO[]> {
    return await this.skinService.getUserAllSkins(currentUser);
  }

  @Post('/:id')
  async buySkin(
    @User() currentUser: IUser,
    @Param() skinId: SkinIdDTO,
  ): Promise<SkinDTO[]> {
    const userSkin = await this.skinService.buySkin(currentUser, +skinId.id);
    if (!userSkin) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return this.skinService.getUserAllSkins(currentUser);
  }

  @Patch('/:id')
  async activateSkin(
    @User() currentUser: IUser,
    @Param() skinId: SkinIdDTO,
  ): Promise<SkinDTO[]> {
    const userSkin = await this.skinService.activateSkin(
      currentUser,
      +skinId.id,
    );

    if (!userSkin) {
      throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
    }

    return this.skinService.getUserAllSkins(currentUser);
  }
}
