import { Component, OnInit } from '@angular/core';
import { ITableHeads, TABLEHEADS } from '../client/client.types';
import { IPurchase } from './purchase.types';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  public tableHeads: ITableHeads[];
  public purchase: IPurchase;

  constructor() { }

  ngOnInit(): void {
    this.tableHeads = TABLEHEADS.filter(head => head);
  }

}
