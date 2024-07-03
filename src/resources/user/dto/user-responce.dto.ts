import {
  UserBonusEntity,
  UserEntity,
  UserSkinEntity,
} from '@app/common/entities';
import { IUser } from '@app/common/models';

export class UserResponceDTO implements IUser {
  id: number;
  username: string;
  telegramId: number;
  referralLink: number;
  balance: number;
  referral: UserEntity;
  friends: UserEntity[];
  userBonuses: UserBonusEntity[];
  createdAt: Date;
  updatedAt: Date;
  userSkins: UserSkinEntity[];
}
