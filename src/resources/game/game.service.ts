import { UserEntity } from '@app/common/entities';
import { AuthGuard } from '@app/common/guards';
import { IUser } from '@app/common/models';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@UseGuards(AuthGuard)
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async increaseBalance(currentUser: IUser, amount: number): Promise<IUser> {
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
      relations: ['referral'],
    });

    const referral = user.referral;
    if (!referral) {
      user.balance += amount;
      return await this.userRepository.save(user);
    }

    const referralPercentage = Math.round(amount * 0.5);
    user.balance += amount;
    referral.balance += referralPercentage;
    await this.userRepository.save(referral);
    return await this.userRepository.save(user);
  }
}
