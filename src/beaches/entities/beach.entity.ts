import { Beach } from '@prisma/client';

export class BeachEntity implements Beach {
  id: number;
  name: string;
  geolocation: string;
  youtube: string;
  description: string;
  directions: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  street: string;
  neighborhood: string;
  number: string;
  additionalAddress: string;
  zipeCode: string;
  cityId: number;
}
