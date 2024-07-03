import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSkinsAndUserSkins1720019653608
  implements MigrationInterface
{
  name = 'CreateSkinsAndUserSkins1720019653608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_bonuses\` DROP FOREIGN KEY \`FK_135e68da6fe667784497faf16e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_bonuses\` DROP FOREIGN KEY \`FK_adbd12ab63b93d34bcaf756181f\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`skins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`type\` int NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_skins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isActive\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, \`skin_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_bonuses\` ADD CONSTRAINT \`FK_dc768d6757445b369708ac90e46\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_bonuses\` ADD CONSTRAINT \`FK_5ed83c735afedae2582160d9dca\` FOREIGN KEY (\`bonus_id\`) REFERENCES \`bonuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_skins\` ADD CONSTRAINT \`FK_ab8f938c942a2d89035b950bfa7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_skins\` ADD CONSTRAINT \`FK_054e6599c143255bbb8bde496c1\` FOREIGN KEY (\`skin_id\`) REFERENCES \`skins\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_skins\` DROP FOREIGN KEY \`FK_054e6599c143255bbb8bde496c1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_skins\` DROP FOREIGN KEY \`FK_ab8f938c942a2d89035b950bfa7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_bonuses\` DROP FOREIGN KEY \`FK_5ed83c735afedae2582160d9dca\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_bonuses\` DROP FOREIGN KEY \`FK_dc768d6757445b369708ac90e46\``,
    );
    await queryRunner.query(`DROP TABLE \`user_skins\``);
    await queryRunner.query(`DROP TABLE \`skins\``);
    await queryRunner.query(
      `ALTER TABLE \`users_bonuses\` ADD CONSTRAINT \`FK_adbd12ab63b93d34bcaf756181f\` FOREIGN KEY (\`bonus_id\`) REFERENCES \`bonuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_bonuses\` ADD CONSTRAINT \`FK_135e68da6fe667784497faf16e1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
