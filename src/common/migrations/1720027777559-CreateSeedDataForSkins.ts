import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedDataForSkins1720027777559 implements MigrationInterface {
  name = 'CreateSeedDataForSkins1720027777559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO skins (name, type, price) VALUES ('SilverRacket', 1, 10000), ('GoldRacket', 1, 20000), ('DragonBall', 2, 25000), ('UnicornBall', 2, 35000)`,
    );
  }

  public async down(): Promise<void> {}
}
