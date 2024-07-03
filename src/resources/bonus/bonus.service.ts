import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonusEntity, UserBonusEntity, UserEntity } from '@app/common/entities';
import {
  ICreateBonus,
  IUser,
  IUserBonus,
  IUserBonuses,
  IBonus,
} from '@app/common/models';

@Injectable()
export class BonusService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserBonusEntity)
    private readonly userBonusesRepository: Repository<UserBonusEntity>,

    @InjectRepository(BonusEntity)
    private readonly bonusRepository: Repository<BonusEntity>,
  ) {}

  async create(bonus: ICreateBonus): Promise<IBonus> {
    const newBonus = await this.bonusRepository.save(bonus);

    this.createNewBonusForAllUsers(newBonus);
    return newBonus;
  }

  async createNewBonusForAllUsers(newBonus: IBonus): Promise<boolean> {
    const allUsers = await this.userRepository.find();
    for (const currentUser of allUsers) {
      const userBonus: Partial<IUserBonus> = {
        availableCount: 2,
        user: currentUser,
        bonus: newBonus,
      };
      await this.userBonusesRepository.save(userBonus);
    }
    return true;
  }

  async remove(deletedBonus: IBonus): Promise<boolean> {
    console.log(deletedBonus);

    await this.userBonusesRepository.delete({
      bonus: {
        id: deletedBonus.id,
      },
    });

    await this.bonusRepository.delete(deletedBonus.id);
    return true;
  }

  async findOne(id: number): Promise<IBonus> {
    const bonus = await this.bonusRepository.findOne({ where: { id } });
    return bonus;
  }

  async getOneUserAllUserBonuses(currentUser: IUser): Promise<IUserBonuses> {
    const userBonuses = await this.userBonusesRepository.find({
      where: { user: { id: currentUser.id } },
    });
    return { userBonuses: userBonuses };
  }

  async useBonus(currentUser: IUser, userBonusId: number): Promise<IUserBonus> {
    const userBonus = await this.userBonusesRepository.findOne({
      where: { id: userBonusId },
      relations: ['user', 'bonus'],
    });

    if (userBonus.user.id !== currentUser.id) {
      return null;
    }

    if (userBonus.availableCount === 0) {
      return userBonus;
    } else {
      userBonus.availableCount--;
    }

    return await this.userBonusesRepository.save(userBonus);
  }
}
