import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedData1719574757559 implements MigrationInterface {
  name = 'CreateSeedData1719574757559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO bonuses (name, maxCount, availableCountPerDay, timeOfAction) VALUES ('wideRacket', 14, 2, 15), ('slowingTheBall', 14, 2, 15)`,
    );
  }

  public async down(): Promise<void> {}
}
