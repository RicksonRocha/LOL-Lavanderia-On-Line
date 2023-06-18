import { StatusType } from 'src/app/shared/models/pedido.model';
import { currencyFormatter, dateFormatter } from '../utils';

export interface ITableHeads {
  title: string;
}

export type colorStatusType = 'info' | 'warning' | 'error' | 'primary' | 'success';
export interface IReport {
  title: StatusType;
  label: string;
  total: number;
  color: colorStatusType;
}

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Número do pedido' },
  { title: 'Data' },
  { title: 'Prazo' },
  { title: 'Status' },
  { title: 'Valor' },
  { title: 'Ação' },
];
