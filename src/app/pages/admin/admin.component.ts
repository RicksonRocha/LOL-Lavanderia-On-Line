import { Component, OnInit } from '@angular/core';
import { dateFormatter } from '../utils';
import { ITableHeads, ModalType, TABLEHEADS } from './admin.types';
import { PedidoService } from '../dashboard/service/pedido.service';
import { ColorStatus, Pedido, StatusType } from 'src/app/shared/models/pedido.model';
import { colorStatusType } from '../client/client.types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public status: StatusType | 'TUDO' = 'TUDO';
  public colorStatus: colorStatusType = ColorStatus['TUDO'];
  public showModal: boolean = false;
  public modalType: ModalType;

  public orders: Pedido[];
  public ordersFiltered: Pedido[];
  public pedido: Pedido | undefined = undefined;

  public tableHeads: ITableHeads[];
  public dateStatus: 'today' | 'all' = 'all';
  public initialDate: string;
  public finalDate: string;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS.filter((head) => head);
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

  public toggleModal(id?: number, type?: ModalType) {
    if (id) {
      this.pedido = this.orders.find((order) => order.id == id);
      this.modalType = type;
    } else {
      this.pedido = undefined;
      this.modalType = 'RECOLHIDO';
    }
    this.showModal = !this.showModal;
  }

  public confirmarAcao() {
    if (this.pedido) {
      this.pedido.status = this.modalType;
      this.pedidoService.alterar(this.pedido).subscribe({
        next: () => {
          alert('Alterado com sucesso!');
        },
      });
    }
    this.toggleModal();
  }

  private filterStatus(status: StatusType | 'TUDO') {
    return this.orders.filter((order) => (status === 'TUDO' ? order : order.status === status));
  }

  public handleStatus(newStatus: StatusType | 'TUDO') {
    this.status = newStatus;
    this.colorStatus = ColorStatus[newStatus.replace(' ', '_').toUpperCase()];
    this.ordersFiltered = this.filterStatus(newStatus);
  }

  public lengthByStatus(status: StatusType | 'TUDO') {
    return this.filterStatus(status).length;
  }

  private formatDate() {
    this.orders = this.orders
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .map((o) => ({ ...o, date: dateFormatter(new Date(o.deadline)) }));
  }

  private filterDate(dateStatus) {
    switch (dateStatus) {
      case 'all':
        return this.ordersFiltered;

      case 'today':
        return this.ordersFiltered.filter(
          (o, i) => new Date(o.deadline).getDate() == new Date().getDate()
        );
    }
  }

  public handleChangeDate(event) {
    const { name, value } = event.target;
    if (name == 'initialDate') {
      this.initialDate = value;
    } else if (name == 'finalDate') {
      this.finalDate = value;
    } else {
      this.ordersFiltered = this.filterDate(value);
      this.formatDate();
    }
  }

  public handleClickDates() {
    this.ordersFiltered = this.orders.filter((o) => {
      const orderDate = new Date(o.deadline).getTime();
      const start = new Date(this.initialDate).getTime();
      const end = new Date(this.finalDate).getTime();
      return orderDate >= start && orderDate <= end;
    });
    this.formatDate();
  }
}
