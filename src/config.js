import { config } from 'dotenv';

config();

module.export = {
  POSTGRES_URI: process.env.POSTGRES_URI
  
};

export const PORT = process.env.PORT || 3000;

