import { City } from '@prisma/client';
export class CityEntity implements City {
  id: number;
  name: string;
  description: string;
  geolocation: string;
  youtube: string;
  state: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
