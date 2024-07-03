import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { UserEntity } from './user.entity';
import { BonusEntity } from './bonus.entity';

@Entity({ name: 'users_bonuses' })
export class UserBonusEntity extends BaseEntity {
  @Column({ default: 0 })
  availableCount: number;

  @ManyToOne(() => UserEntity, (user) => user.userBonuses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => BonusEntity, (bonus) => bonus.userBonuses)
  @JoinColumn({ name: 'bonus_id' })
  bonus: BonusEntity;
}
