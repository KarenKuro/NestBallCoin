import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBonusDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  maxCount: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  availableCountPerDay: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  timeOfAction: number;
}
