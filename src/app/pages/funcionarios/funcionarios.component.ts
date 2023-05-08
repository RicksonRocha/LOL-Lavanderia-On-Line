import { Component, OnInit } from '@angular/core';
import { ITableHeads } from '../purchase/purchase.component';
import { dateFormatter } from '../utils';

const today = dateFormatter(new Date());

export const TABLEHEADS: ITableHeads[] = [
  { title: 'ID' },
  { title: 'Nome' },
  { title: 'E-mail' },
  { title: 'Senha' },
  { title: 'Data de Nascimento' },
  { title: 'Ações' },
];

export type IFuncionario = {
  id: number;
  name: string;
  email: string;
  senha: string;
  birthDate: Date | string;
};

const FUNCIONARIOS: IFuncionario[] = [
  { id: 1, name: 'Harry', email: 'harry.potter@mail.com', senha: '1234', birthDate: today },
  { id: 2, name: 'Hermione', email: 'hermione.granger@mail.com', senha: '1234', birthDate: today },
  { id: 3, name: 'Rony', email: 'rony.weasley@mail.com', senha: '1234', birthDate: today },
];

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss'],
})
export class FuncionariosComponent implements OnInit {
  public tableHeads: ITableHeads[];
  public funcionario: IFuncionario[];

  constructor() {}

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

  openModalExcluir() {
    this.showModalExcluir = true;
  }

  closeModalExcluir() {
    this.showModalExcluir = false;
  }

  openModalAdicionar() {
    this.showModalAdicionar = true;
  }

  closeModalAdicionar() {
    this.showModalAdicionar = false;
  }

  openModalSalvar() {
    this.showModalSalvar = true;
  }

  closeModalSalvar() {
    this.showModalSalvar = false;
  }

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.funcionario = FUNCIONARIOS;
  }
}
