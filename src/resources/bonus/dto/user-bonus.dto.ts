import { BonusEntity, UserEntity } from '@app/common/entities';

export class UserBonusDTO {
  id: number;
  availableCount: number;
  user: UserEntity;
  bonus: BonusEntity;
  createdAt: Date;
  updatedAt: Date;
}
