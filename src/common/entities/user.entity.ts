import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { UserBonusEntity } from './user-bonus.entity';
import { Exclude } from 'class-transformer';
import { UserSkinEntity } from './user-skin.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ unique: true })
  telegramId: number;

  @Column()
  referralLink: number;

  @Column({ default: 0 })
  balance: number;

  @Exclude()
  @OneToMany(() => UserBonusEntity, (userBonuses) => userBonuses.user, {
    eager: true,
  })
  userBonuses: UserBonusEntity[];

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.friends, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'referral_id' })
  referral: UserEntity;

  @Exclude()
  @OneToMany(() => UserEntity, (user) => user.referral)
  friends: UserEntity[];

  @OneToMany(() => UserSkinEntity, (userSkins) => userSkins.user, {
    eager: true,
  })
  userSkins: UserSkinEntity[];
}
