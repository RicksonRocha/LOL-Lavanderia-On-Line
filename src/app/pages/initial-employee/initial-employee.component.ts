import { Component, OnInit } from '@angular/core';
import { ITableHeads, TABLEHEADS, colorStatusType } from './initial-employee.types';
import { PedidoService } from '../dashboard/service/pedido.service';
import { Pedido, StatusType } from 'src/app/shared/models/pedido.model';

@Component({
  selector: 'app-initial-employee',
  templateUrl: './initial-employee.component.html',
  styleUrls: ['./initial-employee.component.scss'],
})
export class InitialEmployeeComponent implements OnInit {
  public status: StatusType = 'EM ABERTO';
  public orders: Pedido[];
  public tableHeads: ITableHeads[];
  public colorStatus: colorStatusType = 'warning';

  public pedido: Pedido = new Pedido();
  public showModal: boolean = false;
  public showModalAction: boolean = false;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.orders = this.listarPedidos();
  }

  listarPedidos(): Pedido[] {
    this.pedidoService.listarTodos().subscribe({
      next: (pedidos) => {
        if (pedidos.length == 0) {
          this.orders = [];
        } else {
          this.orders = pedidos.filter((pedido) => pedido.status == this.status);
        }
      },
    });
    return this.orders;
  }

  public lengthByStatus() {
    return this.orders.filter((order) => order.status == this.status).length;
  }

  toggleModal(id?: number) {
    if (id) {
      console.log(id);
      this.pedido = this.orders.find((pedido) => pedido.id == id);
    }
    this.showModal = !this.showModal;
  }

  confirmacaoRecolhimento() {
    this.pedido.status = 'RECOLHIDO';
    this.pedidoService.alterar(this.pedido).subscribe((pedido) => {
      alert('Pedido recolhido');
    });
    this.toggleModal();
  }
}
