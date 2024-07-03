import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserBonusTableName1719574767565
  implements MigrationInterface
{
  name = 'ChangeUserBonusTableName1719574767565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `RENAME TABLE user_bonuses_entity TO users_bonuses`,
    );
  }

  public async down(): Promise<void> {}
}
