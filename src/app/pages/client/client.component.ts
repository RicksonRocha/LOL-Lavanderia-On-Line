import { Component, OnInit } from '@angular/core';
import { ITableHeads, TABLEHEADS, colorStatusType } from './client.types';
import { PedidoService } from '../dashboard/service/pedido.service';
import { ColorStatus, Pedido, StatusType } from 'src/app/shared/models/pedido.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public status: StatusType | 'TUDO' = 'TUDO';
  public colorStatus: colorStatusType = ColorStatus['TUDO'];

  public orders: Pedido[];
  public ordersFiltered: Pedido[];
  public tableHeads: ITableHeads[];

  public showModal = false;
  public modalType: 'pagar' | 'cancelar' = 'pagar';
  public pedidoSelecionado: number | undefined;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidoService.listarTodos().subscribe({
      next: (pedidos) => {
        if (pedidos.length == 0) {
          this.orders = [];
        } else {
          this.orders = pedidos;
        }

        this.handleStatus('TUDO');
      },
    });
  }

  private filterStatus(status: StatusType | 'TUDO') {
    if (status === 'TUDO') return this.orders;
    return this.orders.filter((order) => order.status === status);
  }

  public handleStatus(newStatus: StatusType | 'TUDO') {
    this.status = newStatus;
    this.colorStatus = ColorStatus[newStatus.replace(' ', '_').toUpperCase()];
    this.ordersFiltered = this.filterStatus(newStatus);
  }

  public lengthByStatus(status: StatusType | 'TUDO') {
    return this.filterStatus(status).length;
  }

  public confirmarAcao() {
    if (this.pedidoSelecionado) {
      let pedidoAlterado = this.orders.find((order) => order.id == this.pedidoSelecionado);
      pedidoAlterado.status = this.modalType == 'pagar' ? 'PAGO' : 'CANCELADO';
      this.pedidoService.alterar(pedidoAlterado).subscribe({
        next: () => {
          alert('Alterado com sucesso!');
        },
      });
    }
    this.toggleModal();
  }

  public toggleModal(type?: 'pagar' | 'cancelar', id?: number) {
    if (type) {
      this.modalType = type;
      this.pedidoSelecionado = id;
    }
    this.showModal = !this.showModal;
  }
}
