import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { City } from './city';

export enum ForecastType {
  CURRENT = 'current',
  DAY5_HOUR3 = '5days3hours',
}

@Entity()
export class Forecast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ForecastType,
    default: ForecastType.CURRENT,
  })
  type: ForecastType;

  @Column('float')
  temp: number;

  @Column('float')
  temp_feels_like: number;

  @Column('float')
  temp_min: number;

  @Column('float')
  temp_max: number;

  @Column({
    nullable: true,
  })
  pressure: number;

  @Column({
    nullable: true,
  })
  humidity: number;

  @Column({
    nullable: true,
  })
  visibility: number;

  @Column({
    nullable: true,
  })
  weather_name: string;

  @Column({
    nullable: true,
  })
  weather_desc: string;

  @Column({
    nullable: true,
  })
  weather_icon: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  wind_speed: number;

  @Column({
    nullable: true,
  })
  wind_deg: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  wind_gust: number;

  @Column({
    nullable: true,
  })
  cloudiness: number;

  @Column()
  for_date: Date;

  @ManyToOne(() => City, (city) => city.forecasts)
  city: City;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
