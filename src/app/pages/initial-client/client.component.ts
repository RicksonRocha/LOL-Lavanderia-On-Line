import { Component, OnInit } from '@angular/core';
import { ITableHeads, TABLEHEADS, colorStatusType } from './client.types';
import { PedidoService } from '../dashboard/service/pedido.service';
import { Pedido, StatusType } from 'src/app/shared/models/pedido.model';
import { LoginService } from 'src/app/layouts/auth-layout/services/login.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class InitialClientComponent implements OnInit {
  public status: StatusType = 'EM ABERTO';
  public orders: Pedido[];
  public tableHeads: ITableHeads[];
  public colorStatus: colorStatusType = 'warning';

  constructor(private pedidoService: PedidoService, private loginService: LoginService) {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.orders = this.listarPedidos();
  }

  listarPedidos(): Pedido[] {
    const clientId = this.loginService.userLogged.id;
    this.pedidoService.buscarPedidoCliente(clientId).subscribe({
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
}
