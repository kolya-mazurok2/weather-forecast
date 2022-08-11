import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { City } from '../entities/city';
import { Forecast } from '../entities/forecast';

interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database?: string;
  ssl?: {
    rejectUnauthorized: boolean;
  };
}

const postgresConfig: PostgresConfig = {
  host: process.env.POSTGRES_HOST || 'db',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
};

if (process.env.ENV === 'prod') {
  postgresConfig.database = process.env.POSTGRES_DB || 'app_db';
  postgresConfig.ssl = {
    rejectUnauthorized: false,
  };
}

export const dataSource = new DataSource({
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [City, Forecast],
  subscribers: [],
  ...postgresConfig,
});
