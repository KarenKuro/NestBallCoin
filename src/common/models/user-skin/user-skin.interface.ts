import { SkinEntity, UserEntity } from '@app/common/entities';

export interface IUserSkin {
  id: number;
  isActive: boolean;
  user: UserEntity;
  skin: SkinEntity;
  createdAt: Date;
  updatedAt: Date;
}
