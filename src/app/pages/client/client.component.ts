import { Component, OnInit } from '@angular/core';
import { dateFormatter } from './client.utils';

declare interface IOrders {
    orderId: string | number;
    date: string | Date;
    price: string | number;
}

declare interface ITableHeads {
    title: string;
}

const mockDate = dateFormatter(new Date)

const ORDERS: IOrders[] = [
    { orderId: 1, date: mockDate, price: 20},
    { orderId: 2, date: mockDate, price: 30},
    { orderId: 3, date: mockDate, price: 40},
    { orderId: 4, date: mockDate, price: 50},
];

const TABLEHEADS: ITableHeads[] = [
    { title: 'Data' },
    { title: 'Número do pedido' },
    { title: 'Valor' },
]

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {

    public orders: IOrders[];
    public tableHeads: ITableHeads[];

    constructor() { }

    ngOnInit() {
        this.orders = ORDERS.filter(order => order);
        this.tableHeads = TABLEHEADS.filter(head => head);
    }

}
