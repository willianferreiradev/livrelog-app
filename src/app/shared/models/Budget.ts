import { Address } from './Address';
import { User } from './user';
import { Characteristic } from './Characteristic';

export interface Budget {
  id: number;
  date?: string;
  comments?: string;
  inventory?: string;
  client_id?: number;
  origin_id?: number;
  destination_id?: number;
  client?: User;
  origin?: Address;
  destination?: Address;
  characteristics?: Characteristic[];
  withdrawal?: Characteristic;
  delivery?: Characteristic;
  photos: string[];
  status: string;
  proposals: any[];
}
