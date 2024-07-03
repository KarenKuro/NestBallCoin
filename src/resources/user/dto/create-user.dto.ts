import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  telegramId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  whoseReferralAreYou?: number;
}
