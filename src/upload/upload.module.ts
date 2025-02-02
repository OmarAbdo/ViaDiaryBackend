import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '../track/track.module'; // Import TrackModule
import { User } from '../user/entities/user.entity'; // Import User class or interface

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 20 * 1024 * 1024, // 20 MB
      },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
          'audio/mpeg',
          'audio/wav',
          'audio/mp3',
          'audio/x-aiff',
          'audio/x-m4a',
          'audio/ogg',
          'audio/flac',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
    }),
    TypeOrmModule.forFeature([User]), // Assuming UserRepository is also needed
    TrackModule, // Import TrackModule to make TrackRepository available
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}