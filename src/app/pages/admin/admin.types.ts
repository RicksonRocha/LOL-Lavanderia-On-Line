import { currencyFormatter, dateFormatter } from '../utils';

export enum ColorStatus {
  TUDO = 'info',
  ABERTO = 'warning',
  RECOLHIDO = 'light',
  CANCELADO = 'danger',
  PAGO = 'warning2',
  FINALIZADO = 'success',
  AGUARDANDO = 'primary',
}

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
  color: colorStatusType;
}

export interface ITableHeads {
  title: string;
}

export type colorStatusType =
  | 'info'
  | 'warning'
  | 'dark'
  | 'light'
  | 'danger'
  | 'primary'
  | 'success'
  | 'warning2';
export interface IReport {
  title: IStatus;
  label: string;
  total: number;
  color: colorStatusType;
}

export const mockDate = dateFormatter(new Date());

export const ORDERS: IOrders[] = [
  { orderId: 1, date: mockDate, price: currencyFormatter(20), status: 'aberto', color: 'warning' },
  { orderId: 2, date: mockDate, price: currencyFormatter(20), status: 'aberto', color: 'warning' },
  { orderId: 3, date: mockDate, price: currencyFormatter(20), status: 'aberto', color: 'warning' },
  {
    orderId: 4,
    date: mockDate,
    price: currencyFormatter(20),
    status: 'aguardando',
    color: ColorStatus.AGUARDANDO,
  },
  {
    orderId: 5,
    date: mockDate,
    price: currencyFormatter(30),
    status: 'recolhido',
    color: ColorStatus.RECOLHIDO,
  },
  {
    orderId: 6,
    date: mockDate,
    price: currencyFormatter(30),
    status: 'recolhido',
    color: ColorStatus.RECOLHIDO,
  },
  {
    orderId: 7,
    date: mockDate,
    price: currencyFormatter(30),
    status: 'pago',
    color: ColorStatus.PAGO,
  },
  {
    orderId: 8,
    date: mockDate,
    price: currencyFormatter(40),
    status: 'cancelado',
    color: ColorStatus.CANCELADO,
  },
  {
    orderId: 9,
    date: mockDate,
    price: currencyFormatter(40),
    status: 'cancelado',
    color: ColorStatus.CANCELADO,
  },
  {
    orderId: 10,
    date: mockDate,
    price: currencyFormatter(50),
    status: 'finalizado',
    color: ColorStatus.FINALIZADO,
  },
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
