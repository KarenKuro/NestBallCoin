import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IdDTO {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
