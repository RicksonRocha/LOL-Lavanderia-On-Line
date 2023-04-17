import { Component, OnInit } from '@angular/core';
import { currencyFormatter, dateFormatter } from '../utils';
import {
  ColorStatus,
  IOrders,
  IStatus,
  ITableHeads,
  ORDERS,
  REPORTS,
  TABLEHEADS,
  colorStatusType,
} from './admin.types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public status: IStatus = 'aberto';
  public colorStatus: colorStatusType = 'warning';
  public orders: IOrders[];
  public tableHeads: ITableHeads[];
  public reports: any[];

  constructor() {}

  ngOnInit() {
    this.orders = ORDERS.filter((order) => order.status === this.status);
    this.tableHeads = TABLEHEADS.filter((head) => head);
    this.reports = REPORTS.map((report) => ({
      ...report,
      total: this.lengthByStatus(report.title),
    }));
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

  public handleAlert() {
    alert('Pedido retirado!');
  }

  public handleAlert2() {
    alert('Pedido lavado!');
  }

  public handleAlert3() {
    alert('Pedido pago!');
  }
}
