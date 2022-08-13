import { Secret } from 'jsonwebtoken';

require('dotenv').config();

export const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY || '';
