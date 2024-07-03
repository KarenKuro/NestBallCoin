import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindUserByTelegramIdDTO {
  @IsNumberString()
  @IsNotEmpty()
  telegramId: string;
}
