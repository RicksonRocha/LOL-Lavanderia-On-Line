import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemRoupa, Pedido } from 'src/app/shared/models/pedido.model';
import { Roupa } from 'src/app/shared/models/roupa.model';
import { RoupaService } from '../roupas/service/roupa.service';
import { NgForm } from '@angular/forms';
import { PedidoService } from './service/pedido.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('formRoupa') formRoupa!: NgForm;
  itemRoupa: ItemRoupa = new ItemRoupa();

  public options: Roupa[];
  public pedido: Pedido = new Pedido();
  public itemsPedido: ItemRoupa[] = [];
  public showModal: boolean = false;
  public showModalAction: boolean = false;
  public action: 'aceitar' | 'rejeitar' = 'aceitar';
  public numeroPedido: number;

  constructor(private roupaService: RoupaService, private pedidoService: PedidoService) {}

  ngOnInit() {
    this.roupaService.listarTodos().subscribe((roupas) => {
      this.options = roupas;
    });
  }

  setFormValue(): void {
    this.itemRoupa = {
      id: undefined,
      name: undefined,
      price: undefined,
      deadline: undefined,
      quantity: undefined,
      totalPrice: undefined,
    };
  }

  toggleModal() {
    this.setFormValue();
    this.showModal = !this.showModal;
  }

  toggleSalvarItem() {
    const { id, quantity } = this.formRoupa.form.value;
    if (!id) return;
    const roupaPedido = this.options.find((option) => option.id == id);
    this.itemsPedido.push({
      ...roupaPedido,
      quantity,
      totalPrice: Number((roupaPedido.price * quantity).toFixed(2)),
    });
    this.toggleModal();
    this.updatePedido();
  }

  removeItem(id: number) {
    this.itemsPedido = this.itemsPedido.filter((item) => item.id != id);
    this.updatePedido();
  }

  updatePedido() {
    const totalPricePedido = this.itemsPedido.reduce((prev, curr) => prev + curr.totalPrice, 0);
    const maiorPrazo = this.itemsPedido.reduce(
      (prev, curr) => (prev > curr.deadline ? prev : curr.deadline),
      0
    );
    this.pedido = new Pedido(
      null,
      new Date(),
      null,
      totalPricePedido,
      maiorPrazo,
      this.itemsPedido
    );
  }

  toggleModalAction(newAction?: 'aceitar' | 'rejeitar') {
    if (newAction) {
      this.action = newAction;

      if (!this.pedido.price) return;

      if (newAction == 'aceitar') {
        this.pedido.status = 'EM ABERTO';
      } else {
        this.pedido.status = 'REJEITADO';
      }

      this.pedidoService.inserir(this.pedido).subscribe((pedido) => {
        this.numeroPedido = newAction == 'aceitar' ? pedido.id : undefined;
      });
    }

    this.showModalAction = !this.showModalAction;
  }
}
