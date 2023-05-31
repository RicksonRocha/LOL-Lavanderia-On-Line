import { currencyFormatter, dateFormatter } from '../utils';

export type IStatus = 'tudo' | 'aberto' | 'rejeitado' | 'cancelado' | 'aguardando';

export interface IOrders {
  orderId: string | number;
  date: string | Date;
  price: string | number;
  status: IStatus;
}

export interface ITableHeads {
  title: string;
}

export type colorStatusType = 'info' | 'warning' | 'error' | 'primary' | 'success';
export interface IReport {
  title: IStatus;
  label: string;
  total: number;
  color: colorStatusType;
}

export const mockDate = dateFormatter(new Date());

export const ORDERS: IOrders[] = [
  { orderId: 1, date: mockDate, price: currencyFormatter(20), status: 'aberto' },
  { orderId: 2, date: mockDate, price: currencyFormatter(20), status: 'aberto' },
  { orderId: 3, date: mockDate, price: currencyFormatter(20), status: 'aberto' },
  { orderId: 4, date: mockDate, price: currencyFormatter(20), status: 'aberto' },
];

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Número do pedido' },
  { title: 'Data' },
  { title: 'Status' },
  { title: 'Valor' },
  { title: '' },
];

export const REPORTS: IReport[] = [
  { title: 'tudo', label: 'Total', total: 1, color: 'info' },
  { title: 'aberto', label: 'Abertos', total: 1, color: 'warning' },
  { title: 'rejeitado', label: 'Rejeitados', total: 1, color: 'error' },
  { title: 'cancelado', label: 'Cancelados', total: 1, color: 'primary' },
  { title: 'aguardando', label: 'Aguardando pagamento', total: 1, color: 'success' },
];
