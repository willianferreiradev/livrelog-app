import { ColorEnum } from '../enums/Color';

export interface Field {
  name: string;
  label: string;
  type?: string;
  color: ColorEnum;
}
