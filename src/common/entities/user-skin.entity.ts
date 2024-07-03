import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { SkinEntity } from './skin.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_skins' })
export class UserSkinEntity extends BaseEntity {
  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.userSkins, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => SkinEntity, (skin) => skin.userSkins)
  @JoinColumn({ name: 'skin_id' })
  skin: SkinEntity;
}
