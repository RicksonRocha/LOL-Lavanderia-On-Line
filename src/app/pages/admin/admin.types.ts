import { currencyFormatter, dateFormatter } from '../utils';

export type IStatus =
  | 'tudo'
  | 'aberto'
  | 'recolhido'
  | 'cancelado'
  | 'pago'
  | 'finalizado'
  | 'aguardando';

export interface IOrders {
  orderId: string | number;
  date: string | Date;
  price: string | number;
  status: IStatus;
}

export interface ITableHeads {
  title: string;
}

export type colorStatusType = 'info' | 'warning' | 'dark' | 'danger' | 'primary' | 'success';
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
  { orderId: 4, date: mockDate, price: currencyFormatter(20), status: 'aguardando' },
  { orderId: 5, date: mockDate, price: currencyFormatter(30), status: 'recolhido' },
  { orderId: 6, date: mockDate, price: currencyFormatter(30), status: 'recolhido' },
  { orderId: 7, date: mockDate, price: currencyFormatter(30), status: 'pago' },
  { orderId: 8, date: mockDate, price: currencyFormatter(40), status: 'cancelado' },
  { orderId: 9, date: mockDate, price: currencyFormatter(40), status: 'cancelado' },
  { orderId: 10, date: mockDate, price: currencyFormatter(50), status: 'finalizado' },
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
  { title: 'cancelado', label: 'Cancelados', total: 1, color: 'danger' },
  { title: 'recolhido', label: 'Recolhidos', total: 1, color: 'dark' },
  { title: 'aguardando', label: 'Aguardando pagamento', total: 1, color: 'primary' },
  { title: 'pago', label: 'Pago', total: 1, color: 'warning' },
  { title: 'finalizado', label: 'Finalizado', total: 1, color: 'success' },
];
