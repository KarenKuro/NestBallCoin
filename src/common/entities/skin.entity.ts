import { Column, Entity, OneToMany } from 'typeorm';
import { SkinsType } from '../enums';
import { BaseEntity } from './base';
import { UserSkinEntity } from './user-skin.entity';

@Entity({ name: 'skins' })
export class SkinEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  type: SkinsType;

  @Column()
  price: number;

  @OneToMany(() => UserSkinEntity, (userSkins) => userSkins.skin)
  userSkins: UserSkinEntity[];

  isAvailable?: boolean;

  isActive?: boolean;
}
