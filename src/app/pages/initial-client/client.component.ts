import { Component, OnInit } from '@angular/core';
import { currencyFormatter, dateFormatter } from '../utils';
import {
  IOrders,
  IStatus,
  ITableHeads,
  ORDERS,
  REPORTS,
  TABLEHEADS,
  colorStatusType,
} from './client.types';
import { ColorStatus } from '../admin/admin.types';
import { User } from 'src/app/shared';
import { UsuarioService } from 'src/app/auth/services/usuario.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class InitialClientComponent implements OnInit {
  public status: IStatus = 'aberto';
  public orders: IOrders[];
  public tableHeads: ITableHeads[];
  public reports: any[];
  public colorStatus: colorStatusType = 'warning';

  usuarios: User[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.orders = ORDERS.filter((order) => order.status === this.status);
    this.tableHeads = TABLEHEADS.filter((head) => head);
    this.reports = REPORTS.map((report) => ({
      ...report,
      total: this.lengthByStatus(report.title),
    }));

    this.listarTodos();
  }

  listarTodos(): User[] {
    this.usuarioService.listarTodos().subscribe({
      next: (data: User[]) => {
        console.log('recebendo data', data);
        if (data == null) {
          this.usuarios = [];
        } else {
          this.usuarios = data;
        }
      },
    });
    return this.usuarios;
  }

  private filterStatus(status: IStatus) {
    return ORDERS.filter((order) => (status === 'tudo' ? order : order.status === status));
  }

  public handleStatus(newStatus: IStatus) {
    this.status = newStatus;
    this.colorStatus = ColorStatus[newStatus.toUpperCase()];
    this.orders = this.filterStatus(newStatus);
  }

  public lengthByStatus(status: IStatus) {
    return this.filterStatus(status).length;
  }
}
