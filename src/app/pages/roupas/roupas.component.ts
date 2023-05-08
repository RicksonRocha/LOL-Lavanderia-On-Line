import { Component, OnInit } from '@angular/core';
import { ITableHeads } from '../purchase/purchase.component';
import { PURCHASE } from '../purchase/purchase.types';
import { IPurchase } from '../purchase/purchase.types';

export const CLOTHESHEADS: ITableHeads[] = [
  { title: 'Nome' },
  { title: 'Preço' },
  { title: 'Prazo' },
  { title: 'Ações' },
];

@Component({
  selector: 'app-roupas',
  templateUrl: './roupas.component.html',
  styleUrls: ['./roupas.component.scss'],
})
export class RoupasComponent implements OnInit {
  public clothesHeads: ITableHeads[];
  public purchase: IPurchase;

  constructor() {}

  showModalEditar = false;
  showModalExcluir = false;
  showModalAdicionar = false;
  showModalSalvar = false;

  openModalEditar() {
    this.showModalEditar = true;
  }

  closeModalEditar() {
    this.showModalEditar = false;
  }

  openModalExcluir() {
    this.showModalExcluir = true;
  }

  closeModalExcluir() {
    this.showModalExcluir = false;
  }

  openModalAdicionar() {
    this.showModalAdicionar = true;
  }

  closeModalAdicionar() {
    this.showModalAdicionar = false;
  }

  openModalSalvar() {
    this.showModalSalvar = true;
  }

  closeModalSalvar() {
    this.showModalSalvar = false;
  }

  ngOnInit() {
    this.purchase = PURCHASE;
    this.clothesHeads = CLOTHESHEADS;
  }
}
