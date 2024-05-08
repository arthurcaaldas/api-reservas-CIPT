import { CorsOptions } from 'cors';

require('dotenv').config();

const whitelist: Array<string> = process.env.APP_WHITELIST?.split(',') || [];

export default {
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: (origin: string, callback: Function) => {
    (!origin || whitelist.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  }
} as CorsOptions