import { Component, OnInit } from '@angular/core';
import { IPurchase, PURCHASE } from './purchase.types';
export interface ITableHeads {
  title: string;
}

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Número do pedido' },
  { title: 'Data' },
  { title: 'Status' },
  { title: 'Preço total' },
];

export const CLOTHESHEADS: ITableHeads[] = [
  { title: 'Nome' },
  { title: 'Quantidade' },
  { title: 'Preço' },
  { title: 'Prazo' },
];

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  public tableHeads: ITableHeads[];
  public clothesHeads: ITableHeads[];
  public purchase: IPurchase;
  public isTableVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.purchase = PURCHASE;
    this.tableHeads = TABLEHEADS;
    this.clothesHeads = CLOTHESHEADS;
  }

  public handleSearch() {
    this.isTableVisible = !this.isTableVisible;
  }
}
