import { Component, OnInit, ViewChild } from '@angular/core';
import { ITableHeads } from '../purchase/purchase.component';
import { PURCHASE } from '../purchase/purchase.types';
import { IPurchase } from '../purchase/purchase.types';
import { RoupaService } from './service/roupa.service';
import { Roupa } from 'src/app/shared/models/roupa.model';
import { NgForm } from '@angular/forms';

export const CLOTHESHEADS: ITableHeads[] = [
  { title: 'Nome' },
  { title: 'Preço' },
  { title: 'Prazo' },
  { title: 'Ações' },
];

@Component({
  selector: 'app-roupas',
  templateUrl: './roupas.component.html',
  styleUrls: ['./roupas.component.scss'],
})
export class RoupasComponent implements OnInit {
  @ViewChild('formRoupa') formRoupa!: NgForm;
  roupa: Roupa = new Roupa();
  public clothesHeads: ITableHeads[];
  public roupas: Roupa[];
  public roupaSelecionada: number | null;
  public showModal: boolean = false;
  public showModalExcluir: boolean = false;
  public modalType: 'adicionar' | 'editar' = 'adicionar';

  constructor(private roupaService: RoupaService) {}

  ngOnInit() {
    this.roupas = [];
    this.listarRoupas();
    this.clothesHeads = CLOTHESHEADS;
  }

  toggleExcluir(id?: number) {
    if (id) {
      this.roupaSelecionada = id;
    } else {
      this.roupaSelecionada = null;
    }
    this.showModalExcluir = !this.showModalExcluir;
  }

  confirmacaoExcluir(confirmacao: boolean) {
    if (confirmacao) {
      this.roupaService.remover(this.roupaSelecionada).subscribe((roupa) => {
        alert('deletada com sucesso');
        this.listarRoupas();
      });
    }
    this.toggleExcluir();
  }

  toggleSalvar() {
    const { name, price, deadline } = this.formRoupa.form.value;

    if (this.modalType == 'adicionar') {
      let roupaNova = new Roupa(null, name, price, deadline);
      this.roupaService.inserir(roupaNova).subscribe((roupa) => {
        alert('adicionado com sucesso');
        this.listarRoupas();
      });
    } else {
      let roupaEditada = new Roupa(this.roupaSelecionada, name, price, deadline);
      this.roupaService.alterar(roupaEditada).subscribe((roupa) => {
        alert('alterado com sucesso');
        this.listarRoupas();
      });
    }
    this.toggleModal();
    this.setFormValue();
  }

  toggleModal(type?: 'adicionar' | 'editar', roupaId?: number) {
    if (type) {
      this.modalType = type;
    }
    this.roupaSelecionada = roupaId ? roupaId : null;
    this.setFormValue();
    this.showModal = !this.showModal;
  }

  listarRoupas(): void {
    this.roupaService.listarTodos().subscribe((roupas) => {
      this.roupas = roupas;
    });
  }

  setFormValue(): void {
    if (this.roupaSelecionada) {
      this.roupa = this.roupas.find((roupa) => roupa.id === this.roupaSelecionada);
    } else {
      this.roupa = { id: undefined, name: undefined, price: undefined, deadline: undefined };
    }
  }
}
