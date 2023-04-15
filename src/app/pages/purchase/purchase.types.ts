import { currencyFormatter, dateFormatter } from '../utils';

const today = dateFormatter(new Date());

export type IClothing = {
  id: number;
  name: string;
  quantity: number;
  price: number | string;
  deadline: string | Date;
};

export type IPurchase = {
  id: number;
  deadline: string | Date;
  price: number | string;
  status: string;
  items: IClothing[];
};

const PURCHASE_ITEMS: IClothing[] = [
  { id: 1, name: 'Saia', quantity: 2, price: currencyFormatter(4), deadline: today },
  { id: 2, name: 'Jaqueta', quantity: 1, price: currencyFormatter(5), deadline: today },
  { id: 1, name: 'Camisa', quantity: 1, price: currencyFormatter(10), deadline: today },
];

export const PURCHASE: IPurchase = {
  id: 1,
  deadline: today,
  price: currencyFormatter(55),
  status: 'ABERTO',
  items: PURCHASE_ITEMS,
};
