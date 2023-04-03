import { Component, OnInit } from '@angular/core';
import { currencyFormatter, dateFormatter } from './client.utils';

declare type IStatus = 'tudo' | 'aberto' | 'rejeitado' | 'cancelado' | 'aguardando'

declare interface IOrders {
    orderId: string | number;
    date: string | Date;
    price: string | number;
    status: IStatus;
}

declare interface ITableHeads {
    title: string;
}

declare type colorStatusType = 'info' | 'warning' | 'error' | 'primary' | 'success'
declare interface IReport {
    title: IStatus;
    total: number;
    color: colorStatusType
}

const mockDate = dateFormatter(new Date)

const ORDERS: IOrders[] = [
    { orderId: 1, date: mockDate, price: currencyFormatter(20), status: 'aberto' },
    { orderId: 2, date: mockDate, price: currencyFormatter(20), status: 'aberto' },
    { orderId: 3, date: mockDate, price: currencyFormatter(20), status: 'aberto' },
    { orderId: 4, date: mockDate, price: currencyFormatter(20), status: 'aberto' },
    { orderId: 5, date: mockDate, price: currencyFormatter(30), status: 'aguardando'},
    { orderId: 6, date: mockDate, price: currencyFormatter(30), status: 'aguardando'},
    { orderId: 7, date: mockDate, price: currencyFormatter(30), status: 'aguardando'},
    { orderId: 8, date: mockDate, price: currencyFormatter(40), status: 'cancelado'},
    { orderId: 9, date: mockDate, price: currencyFormatter(40), status: 'cancelado'},
    { orderId: 10, date: mockDate, price: currencyFormatter(50), status: 'rejeitado'},
];

const TABLEHEADS: ITableHeads[] = [
    { title: 'Número do pedido' },
    { title: 'Data' },
    { title: 'Status' },
    { title: 'Valor' },
    { title: '' },
]

const REPORTS: IReport[] = [
    {title: 'tudo', total: 1, color: 'info'},
    {title: 'aberto', total: 1, color: 'warning'},
    {title: 'rejeitado', total: 1, color: 'error'},
    {title: 'cancelado', total: 1, color: 'primary'},
    {title: 'aguardando', total: 1, color: 'success'},
]

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {

    public status: IStatus = 'aberto';
    public orders: IOrders[];
    public tableHeads: ITableHeads[];
    public reports: any[];

    constructor() { }

    ngOnInit() {
        this.orders = ORDERS.filter(order => order.status === this.status);
        this.tableHeads = TABLEHEADS.filter(head => head);
        this.reports = REPORTS.map(report => ({...report, total: this.lengthByStatus(report.title)}))
    }

    private filterStatus(status: IStatus) {
        return ORDERS.filter(order => status === 'tudo' ? order : order.status === status);
    }

    public handleStatus(newStatus: IStatus) {
        this.orders = this.filterStatus(newStatus)
    }

    public lengthByStatus(status: IStatus) {
        return this.filterStatus(status).length
    }

}
