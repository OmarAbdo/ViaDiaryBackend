import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { PlaylistModule } from './playlist/playlist.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as mysql from 'mysql2/promise';
import { stringToBoolean } from './utils/utils';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Async TypeORM configuration
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
        });

        await connection.query(`
          CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}
        `);
        await connection.end();

        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: stringToBoolean(process.env.DB_SYNCHRONIZE),
        };
      },
    }),
    UserModule,
    TrackModule,
    PlaylistModule,
    CommentModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
