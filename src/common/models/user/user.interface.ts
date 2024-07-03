import { UserBonusEntity, UserEntity } from '@app/common/entities';

export interface IUser extends UserEntity {
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
}
