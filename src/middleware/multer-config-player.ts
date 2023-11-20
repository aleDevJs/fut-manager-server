import multer from 'fastify-multer';
import path from 'path';

export const multerConfigPlayer = {
  storage: multer.diskStorage({
    destination: (req: any, file: any, callback: any) => {
      callback(null, path.join(__dirname, '../uploads/playerFiles'));
    },
    filename: (req: any, file: any, callback: any) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
}