require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";

const postgresConfig = {
  host: process.env.POSTGRES_HOST || "db",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRESS_DB || "app_db",
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
};

export const dataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: ["./src/entities/*.ts"],
  subscribers: [],
  migrations: ["./src/migrations/*.ts"],
  ...postgresConfig,
});
