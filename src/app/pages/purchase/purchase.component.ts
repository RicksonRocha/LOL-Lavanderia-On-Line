import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPurchase, PURCHASE } from './purchase.types';
import { PedidoService } from '../dashboard/service/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';
export interface ITableHeads {
  title: string;
}

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Número do pedido' },
  { title: 'Data' },
  { title: 'Prazo' },
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
  @ViewChild('selectElement') myDOMEle: ElementRef;
  public tableHeads: ITableHeads[];
  public clothesHeads: ITableHeads[];
  public pedidos: Pedido[];
  public pedidoDetalhe: Pedido | undefined = undefined;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.tableHeads = TABLEHEADS;
    this.clothesHeads = CLOTHESHEADS;
    this.listarPedidos();
  }

  private listarPedidos() {
    this.pedidoService.listarTodos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  private buscarPedido(id: number) {
    this.pedidoService.buscarPorId(id).subscribe((pedido) => {
      this.pedidoDetalhe = pedido;
      console.log('pedido deatlhe', this.pedidoDetalhe);
    });
  }

  public handleSearch() {
    let pedidoId = this.myDOMEle.nativeElement.value;
    if (pedidoId) {
      this.buscarPedido(pedidoId);
    }
  }
}
