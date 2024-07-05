import { ISkin, IUser } from '@app/common/models';

export class UserSkinDTO {
  id: number;
  isActive: boolean;
  user: IUser;
  skin: ISkin;
  createdAt: Date;
  updatedAt: Date;
}
