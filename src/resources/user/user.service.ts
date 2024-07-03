import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonusEntity, UserBonusEntity, UserEntity } from '@app/common/entities';
import { ICreateUser, IUser, IUserBonus } from '@app/common/models';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserBonusEntity)
    private readonly userBonusesRepository: Repository<UserBonusEntity>,

    @InjectRepository(BonusEntity)
    private readonly bonusRepository: Repository<BonusEntity>,
  ) {}

  async create(body: ICreateUser): Promise<IUser> {
    const user: Partial<IUser> = {};
    user.username = body.username;
    user.telegramId = body.telegramId;
    user.referralLink = +(
      body.telegramId + Math.floor(Math.random() * 1000).toString()
    );

    if (
      body.whoseReferralAreYou &&
      body.whoseReferralAreYou !== user.referralLink
    ) {
      const whoseReferralAreYou = await this.userRepository.findOneBy({
        referralLink: body.whoseReferralAreYou,
      });

      if (!whoseReferralAreYou) {
        user.referral = null;
      } else {
        user.referral = whoseReferralAreYou;
      }
    } else {
      user.referral = null;
    }

    const newUser = await this.userRepository.save(user);

    await this.createBonusesForUser(newUser);
    return newUser;
  }

  async findByTelegramId(telegramId: number): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { telegramId },
      relations: { referral: true, friends: true },
    });

    return user;
  }

  async findById(id: number): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { referral: true, friends: true },
    });
    return user;
  }

  async createBonusesForUser(currentUser: IUser) {
    const bonusArr = await this.bonusRepository.find();
    for (const oneBonus of bonusArr) {
      const userBonus: Partial<IUserBonus> = {
        availableCount: 2,
        user: currentUser,
        bonus: oneBonus,
      };
      await this.userBonusesRepository.save(userBonus);
    }
  }
}
