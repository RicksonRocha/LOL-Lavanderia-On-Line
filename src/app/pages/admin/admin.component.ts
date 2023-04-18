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
  public dateStatus: 'today' | 'all' = 'all';
  public initialDate: string;
  public finalDate: string;

  constructor() {}

  ngOnInit() {
    this.orders = ORDERS.filter((order) => order.status === this.status);
    this.formatDate();
    this.tableHeads = TABLEHEADS.filter((head) => head);
    this.reports = REPORTS.map((report) => ({
      ...report,
      total: this.lengthByStatus(report.title),
    }));
  }

  private formatDate() {
    this.orders = this.orders
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((o) => ({ ...o, date: dateFormatter(new Date(o.date)) }));
  }

  private filterStatus(status: IStatus) {
    return ORDERS.filter((order) => (status === 'tudo' ? order : order.status === status));
  }

  private filterDate(dateStatus) {
    switch (dateStatus) {
      case 'all':
        return ORDERS;

      case 'today':
        return ORDERS.filter((o, i) => new Date(o.date).getDate() == new Date().getDate());
    }
  }

  public handleStatus(newStatus: IStatus) {
    this.status = newStatus;
    this.colorStatus = ColorStatus[newStatus.toUpperCase()];
    this.orders = this.filterStatus(newStatus);
    this.formatDate();
  }

  public lengthByStatus(status: IStatus) {
    return this.filterStatus(status).length;
  }

  public handleChangeDate(event) {
    const { name, value } = event.target;
    if (name == 'initialDate') {
      this.initialDate = value;
    } else if (name == 'finalDate') {
      this.finalDate = value;
    } else {
      this.orders = this.filterDate(value);
      this.formatDate();
    }
  }

  public handleClickDates() {
    this.orders = ORDERS.filter((o) => {
      const orderDate = new Date(o.date).getTime();
      const start = new Date(this.initialDate).getTime();
      const end = new Date(this.finalDate).getTime();
      return orderDate >= start && orderDate <= end;
    });
    this.formatDate();
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
