import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Forecast } from "./forecast";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("float")
  latitude: number;

  @Column("float")
  longitude: number;

  @OneToMany(() => Forecast, (forecast) => forecast.city)
  forecasts: Forecast[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
