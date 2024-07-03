import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { DBHOST, DBPORT, DBUSERNAME, DBPASSWORD, DBNAME } from 'config';
import { DataSource } from 'typeorm';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: DBHOST,
  port: DBPORT,
  username: DBUSERNAME,
  password: DBPASSWORD,
  database: DBNAME,
  entities: [__dirname + '**/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/**/**/migrations/*.ts'],
};

export const AppDataSource = new DataSource(config);
export default config;
