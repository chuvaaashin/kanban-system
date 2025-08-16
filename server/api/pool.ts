import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), 'dev.env') });

const poolConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.NAME,
    port: Number(process.env.PORT)
}

export const pool = new Pool(poolConfig);
