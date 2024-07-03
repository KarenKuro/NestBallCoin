import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1719574757537 implements MigrationInterface {
  name = 'CreateTables1719574757537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`bonuses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`maxCount\` int NOT NULL, \`availableCountPerDay\` int NOT NULL, \`timeOfAction\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_bonuses_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`availableCount\` int NOT NULL DEFAULT '0', \`user_id\` int NULL, \`bonus_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`telegramId\` int NOT NULL, \`referralLink\` int NOT NULL, \`balance\` int NOT NULL DEFAULT '0', \`referral_id\` int NULL, UNIQUE INDEX \`IDX_df18d17f84763558ac84192c75\` (\`telegramId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_bonuses_entity\` ADD CONSTRAINT \`FK_135e68da6fe667784497faf16e1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_bonuses_entity\` ADD CONSTRAINT \`FK_adbd12ab63b93d34bcaf756181f\` FOREIGN KEY (\`bonus_id\`) REFERENCES \`bonuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_83acdbbbbc697d40a2c03bab920\` FOREIGN KEY (\`referral_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_83acdbbbbc697d40a2c03bab920\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_bonuses_entity\` DROP FOREIGN KEY \`FK_adbd12ab63b93d34bcaf756181f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_bonuses_entity\` DROP FOREIGN KEY \`FK_135e68da6fe667784497faf16e1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_df18d17f84763558ac84192c75\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`user_bonuses_entity\``);
    await queryRunner.query(`DROP TABLE \`bonuses\``);
  }
}
