import { TypeUserEnum } from '../enums/TypeUser';

export interface User {
  access_token?: string;
  active?: number;
  back_cnh?: string;
  back_cpf?: string;
  category_cnh?: string;
  cnh?: string;
  cpf_cnpj: string;
  created_at: string;
  deleted_at?: string;
  email: string;
  front_cnh?: string;
  front_cpf?: string;
  id: number;
  name: string;
  phone?: string;
  photo?: string;
  status?: number;
  transporter_id?: number;
  type: TypeUserEnum;
  updated_at: string;
}
