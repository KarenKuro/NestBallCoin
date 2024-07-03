import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AmountDTO {
  @IsNumberString()
  @IsNotEmpty()
  amount: string;
}
