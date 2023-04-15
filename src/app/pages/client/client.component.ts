import { Component, OnInit } from '@angular/core';
import { currencyFormatter, dateFormatter } from '../utils';
import { IOrders, IStatus, ITableHeads, ORDERS, REPORTS, TABLEHEADS } from './client.types';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public status: IStatus = 'aberto';
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
    this.orders = this.filterStatus(newStatus);
  }

  public lengthByStatus(status: IStatus) {
    return this.filterStatus(status).length;
  }
}
