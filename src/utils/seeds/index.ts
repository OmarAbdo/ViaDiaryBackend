// src/seeds/index.ts
import { AppModule } from '../../app.module';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import CreateUsers from './UserSeeder';
import CreateTracks from './TrackSeeder';
import CreatePlaylists from './PlaylistSeeder';
import CreateComments from './CommentSeeder';

export async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get<DataSource>(getDataSourceToken());

  // Your seeding logic using the dataSource goes here
  await CreateUsers.run(dataSource);
  await CreateTracks.run(dataSource);
  await CreatePlaylists.run(dataSource);
  await CreateComments.run(dataSource);

  await app.close();
}
