export interface ITableHeads {
  title: string;
}

export type colorStatusType = 'info' | 'warning' | 'error' | 'primary' | 'success';

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Número do pedido' },
  { title: 'Data' },
  { title: 'Prazo' },
  { title: 'Status' },
  { title: 'Valor' },
  { title: 'Ação' },
];
