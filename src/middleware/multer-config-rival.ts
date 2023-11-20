import multer from 'fastify-multer';
import path from 'path';

export const multerConfigRival = {
  storage: multer.diskStorage({
    destination: (req: any, file: any, callback: any) => {
      callback(null, path.join(__dirname, '../uploads/rivalFiles'));
    },
    filename: (req: any, file: any, callback: any) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
}