require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";

const postgresConfig = {
  host: process.env.POSTGRES_HOST || "db",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
};

export const dataSource = new DataSource({
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: ["./src/entities/**/*.entity{.ts,.js}"],
  migrations: ["./src/migrations/**/*{.ts,.js}"],
  subscribers: [],
  ...postgresConfig,
});
