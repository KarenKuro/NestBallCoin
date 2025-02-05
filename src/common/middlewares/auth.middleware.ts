import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { IExpressRequest } from '../models';
import { UserService } from '@app/resources';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: IExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const telegramId = req.headers.authorization.split(' ')[1];
    try {
      const user = await this.userService.findByTelegramId(+telegramId);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
