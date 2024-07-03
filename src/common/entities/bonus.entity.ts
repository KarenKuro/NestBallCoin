import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { UserBonusEntity } from './user-bonus.entity';

@Entity('bonuses')
export class BonusEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  maxCount: number;

  @Column()
  availableCountPerDay: number;

  @Column()
  timeOfAction: number;

  @OneToMany(() => UserBonusEntity, (userBonuses) => userBonuses.bonus)
  userBonuses: UserBonusEntity[];
}
