import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { AuthGuard } from '@app/common/guards';
import { IUser } from '@app/common/models';
import { User } from '@app/common/decorators';
import { AmountDTO } from './dto';
import { UserResponceDTO } from '../user/dto';

@UseGuards(AuthGuard)
@Controller('result')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getBalance(@User() currentUser: IUser): number {
    return currentUser.balance;
  }

  @Put('/:amount')
  async increaseBalance(
    @User() currentUser: IUser,
    @Param() param: AmountDTO,
  ): Promise<UserResponceDTO> {
    const amount = +param.amount;

    if (amount < 0) {
      throw new HttpException(
        'amount should be a positive',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.gameService.increaseBalance(currentUser, amount);
    return user;
  }
}
