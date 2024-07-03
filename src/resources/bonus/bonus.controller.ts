import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@app/common/guards';
import { BonusService } from './bonus.service';
import { UserService } from '../user';
import {
  BonusResponceDTO,
  CreateBonusDTO,
  IdDTO,
  UserBonusDTO,
  UserBonusResponceDTO,
} from './dto';
import { User } from '@app/common/decorators';
import { IUser } from '@app/common/models';
import { admins } from '@app/common/maps';

@UseGuards(AuthGuard)
@Controller('bonuses')
export class BonusController {
  constructor(
    private readonly bonusService: BonusService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @User() currentUser: IUser,
    @Body()
    createBonusDTO: CreateBonusDTO,
  ): Promise<BonusResponceDTO> {
    const user = await this.userService.findByTelegramId(
      currentUser.telegramId,
    );

    const isAdmin = admins.has(user.telegramId);
    if (!isAdmin) {
      throw new HttpException('permission denied', HttpStatus.BAD_REQUEST);
    }
    const bonus = await this.bonusService.create(createBonusDTO);

    return bonus;
  }

  @Delete('/:id')
  async remove(
    @User() currentUser: IUser,
    @Param() param: IdDTO,
  ): Promise<boolean> {
    const isAdmin = admins.has(currentUser.telegramId);
    if (!isAdmin) {
      throw new HttpException('permission denied', HttpStatus.BAD_REQUEST);
    }

    const deletedBonus = await this.bonusService.findOne(+param.id);

    if (!deletedBonus) {
      throw new HttpException(
        'bonus with that id not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.bonusService.remove(deletedBonus);
  }

  @Get()
  async getOneUserAllUserBonuses(
    @User() currentUser: IUser,
  ): Promise<UserBonusResponceDTO> {
    return await this.bonusService.getOneUserAllUserBonuses(currentUser);
  }

  @Put('/:id')
  async useBonus(
    @User() currentUser: IUser,
    @Param() userBonusId: IdDTO,
  ): Promise<UserBonusDTO> {
    const userBonus = await this.bonusService.useBonus(
      currentUser,
      +userBonusId.id,
    );

    if (!userBonus) {
      throw new HttpException('permission denied', HttpStatus.BAD_REQUEST);
    }

    return userBonus;
  }
}
