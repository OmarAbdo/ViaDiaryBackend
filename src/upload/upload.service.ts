import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  // The logic for file processing can be added here
  handleFile(file: Express.Multer.File) {
    // For now, just log the file details
    console.log(file);
  }
}
