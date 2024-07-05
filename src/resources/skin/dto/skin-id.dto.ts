import { IsNotEmpty, IsNumberString } from 'class-validator';

export class SkinIdDTO {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
