import { BonusEntity, UserEntity } from '@app/common/entities';

export interface IUserBonus {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  availableCount: number;
  user: UserEntity;
  bonus: BonusEntity;
}
