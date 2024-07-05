import { SkinsType } from '@app/common/enums';

export class SkinDTO {
  id: number;
  name: string;
  type: SkinsType;
  price: number;
  isAvailable?: boolean;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
