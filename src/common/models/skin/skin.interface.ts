import { UserSkinEntity } from '@app/common/entities';
import { SkinsType } from '@app/common/enums';

export interface ISkin {
  id: number;
  name: string;
  type: SkinsType;
  price: number;
  userSkins: UserSkinEntity[];
  isAvailable?: boolean;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
