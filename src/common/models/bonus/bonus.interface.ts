import { BonusEntity } from '@app/common/entities';

export interface IBonus extends BonusEntity {
  id: number;
  name: string;
  maxCount: number;
  availableCountPerDay: number;
  timeOfAction: number;
  createdAt: Date;
  updatedAt: Date;
}
