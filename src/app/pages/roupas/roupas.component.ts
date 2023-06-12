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

  constructor(private roupaService: RoupaService) {}

  showModalEditar = false;
  showModalExcluir = false;
  showModalAdicionar = false;
  showModalSalvar = false;

  openModalEditar() {
    this.showModalEditar = true;
  }

  closeModalEditar() {
    this.showModalEditar = false;
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

  toggleAdicionar(confirmacao?: boolean) {
    if (confirmacao) {
      const { name, price, deadline } = this.formRoupa.form.value;
      let roupaNova = new Roupa(null, name, price, deadline);
      this.roupaService.inserir(roupaNova).subscribe((roupa) => {
        alert('adicionado com sucesso');
        this.listarRoupas();
      });
    }
    this.showModalAdicionar = !this.showModalAdicionar;
  }

  openModalSalvar() {
    this.showModalSalvar = true;
  }

  closeModalSalvar() {
    this.showModalSalvar = false;
  }

  ngOnInit() {
    this.roupas = [];
    this.listarRoupas();
    this.clothesHeads = CLOTHESHEADS;
  }

  listarRoupas(): void {
    this.roupaService.listarTodos().subscribe((roupas) => {
      this.roupas = roupas;
    });
  }
}
