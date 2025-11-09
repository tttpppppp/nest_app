import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIGURATION } from '../configuration';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => CONFIGURATION],
    }),
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static CONFIGURATION = CONFIGURATION;
}
