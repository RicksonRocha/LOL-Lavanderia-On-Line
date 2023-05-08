import { Component, OnInit } from '@angular/core';
import { ITableHeads } from '../purchase/purchase.component';
import { dateFormatter } from '../utils';

const today = dateFormatter(new Date());

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Numero pedido' },
  { title: 'Cliente' },
  { title: 'Valor total' },
  { title: 'Quantidade de peças' },
  { title: 'Data' },
];

export type IReceita = {
  pedido: number;
  cliente: string;
  valor: string;
  quantidade: string;
  data: Date | string;
};

const RECEITAS: IReceita[] = [
  { pedido: 1, cliente: 'Joao', valor: 'R$ 65,00', quantidade: '12', data: today },
  { pedido: 2, cliente: 'Felipe', valor: 'R$ 45,00', quantidade: '8', data: today },
  { pedido: 3, cliente: 'Francisco', valor: 'R$ 51,00', quantidade: '10', data: today },
];

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss'],
})
export class ReceitaComponent implements OnInit {
  public tableHeads: ITableHeads[];
  public receita: IReceita[];

  constructor() {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.receita = RECEITAS;
  }
}
