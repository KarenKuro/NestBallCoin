import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { BonusModule, GameModule, SkinModule, UserModule } from './resources';
import { AuthMiddleware } from './common/middlewares';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './shared';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ScheduleModule.forRoot(),
    UserModule,
    BonusModule,
    GameModule,
    TasksModule,
    SkinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
