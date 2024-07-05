import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SkinEntity, UserEntity, UserSkinEntity } from '@app/common/entities';
import { ISkin, IUser, IUserSkin } from '@app/common/models';

@Injectable()
export class SkinService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserSkinEntity)
    private readonly userSkinRepository: Repository<UserSkinEntity>,

    @InjectRepository(SkinEntity)
    private readonly skinRepository: Repository<SkinEntity>,
  ) {}

  async findOneSkin(skinId: number): Promise<ISkin> {
    const skin = await this.skinRepository.findOne({ where: { id: skinId } });
    return skin;
  }

  async findAllSkins(): Promise<ISkin[]> {
    const skins = await this.skinRepository.find();
    return skins;
  }

  async getUserAllSkins(currentUser: IUser): Promise<ISkin[]> {
    const skins = await this.skinRepository.find(); //Берем все скины из таблицы скинов
    const userSkins = await this.userSkinRepository.find({
      where: { user: { id: currentUser.id } },
      order: { skin: { type: 'ASC' } },
      relations: ['skin'],
    }); //Выбираем из таблицы юзерСкинс все скины одного юзера

    const results: SkinEntity[] = [];
    for (const skin of skins) {
      const userSkin = userSkins.find((e) => e.skin.id === skin.id); // для каждого скина берем из юзерСкин элемент,
      //и смотрим есть ли этот скин в юзерСкине

      results.push({
        ...skin,
        isAvailable: Boolean(userSkin),
        isActive: userSkin?.isActive ?? false,
      });
    }

    return results;
  }

  async buySkin(currentUser: IUser, skinId: number): Promise<IUserSkin> {
    const skin = await this.findOneSkin(skinId);
    const userSkins = await this.userSkinRepository.find({
      where: { user: { id: currentUser.id } },
      order: { skin: { type: 'ASC' } },
      relations: ['skin'],
    });

    if (!skin) {
      return null;
    }

    if (currentUser.balance < skin.price) {
      return null;
    }

    for (const userSkin of userSkins) {
      if (userSkin.skin.id === skin.id) {
        return null;
      }
    }

    currentUser.balance -= skin.price;
    await this.userRepository.save(currentUser);
    const userSkin: Partial<IUserSkin> = { user: currentUser, skin: skin };

    return await this.userSkinRepository.save(userSkin);
  }

  async activateSkin(currentUser: IUser, skinId: number): Promise<IUserSkin> {
    const activatedSkin = await this.skinRepository.findOne({
      where: { id: skinId },
    });

    if (!activatedSkin) {
      throw new HttpException('skin not found', HttpStatus.NOT_FOUND);
    }

    await this.userSkinRepository
      .createQueryBuilder('userSkin')
      .innerJoin('userSkin.user', 'user')
      .innerJoin('userSkin.skin', 'skin')
      .update()
      .set({ isActive: false, updatedAt: new Date() })
      .where('user.id = :userId', { userId: currentUser.id })
      .andWhere('skin.id = :skinType', { skinType: activatedSkin.type })
      .execute();

    await this.userSkinRepository.update(
      {
        user: { id: currentUser.id },
        skin: { id: skinId },
      },
      { isActive: true },
    );

    return this.userSkinRepository.findOne({
      where: { user: { id: currentUser.id } },
    });
  }
}
