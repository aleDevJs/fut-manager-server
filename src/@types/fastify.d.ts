import { FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    file: {
      fieldname: string;
      filename: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    };
  }
}
