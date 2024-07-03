import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, FindUserByTelegramIdDTO, UserResponceDTO } from './dto';
import { AuthGuard } from '@app/common/guards';
import { User } from '@app/common/decorators';
import { IUser } from '@app/common/models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserResponceDTO> {
    if (await this.userService.findByTelegramId(createUserDTO.telegramId)) {
      throw new HttpException(
        'user with this telegramId exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.create(createUserDTO);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/:telegramId')
  async whoAmI(
    @Param()
    params: FindUserByTelegramIdDTO,
    @User() currentUser: IUser,
  ): Promise<UserResponceDTO> {
    if (+params.telegramId !== currentUser.telegramId) {
      throw new HttpException('permission denied', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.findByTelegramId(+params.telegramId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
