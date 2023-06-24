import { Component, OnInit, ViewChild } from '@angular/core';
import { ITableHeads } from '../purchase/purchase.component';
import { dateFormatter } from '../utils';
import { FuncionariosService } from './service/funcionarios.service';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { NgForm } from '@angular/forms';

const today = dateFormatter(new Date());

export const TABLEHEADS: ITableHeads[] = [
  { title: 'ID' },
  { title: 'Nome' },
  { title: 'E-mail' },
  { title: 'Data de Nascimento' },
  { title: 'Ações' },
];

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss'],
})
export class FuncionariosComponent implements OnInit {
  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  funcionario: Funcionario = new Funcionario();
  public tableHeads: ITableHeads[];
  public funcionarios: Funcionario[];
  public funcionarioSelecionado: number | null;
  public showModal: boolean = false;
  public modalType: 'adicionar' | 'editar' = 'adicionar';

  constructor(private funcionariosService: FuncionariosService) {}

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

  toggleExcluir(id?: number) {
    if (id) {
      this.funcionarioSelecionado = id;
    } else {
      this.funcionarioSelecionado = null;
    }
    this.showModalExcluir = !this.showModalExcluir;
  }

  confirmacaoExcluir(confirmacao: boolean) {
    if (confirmacao) {
      this.funcionariosService.remover(this.funcionarioSelecionado).subscribe((funcionario) => {
        alert('deletada com sucesso');
        this.listarFuncionarios();
      });
    }
    this.toggleExcluir();
  }

  // toggleAdicionar(confirmacao?: boolean) {
  //   if (confirmacao) {
  //     const { name, email, password, birth_date } = this.formFuncionario.form.value;
  //     let funcionarioNovo = new Funcionario(null, name, email, password, birth_date);
  //     this.funcionariosService.inserir(funcionarioNovo).subscribe((funcionario) => {
  //       alert('adicionado com sucesso');
  //       this.listarFuncionarios();
  //     });
  //   }
  //   this.showModalAdicionar = !this.showModalAdicionar;
  // }

  toggleSalvar() {
    const { name, email, birth_date } = this.formFuncionario.form.value;

    if (this.modalType == 'adicionar') {
      let funcionarioNovo = new Funcionario(null, name, email, null, birth_date);
      this.funcionariosService.inserir(funcionarioNovo).subscribe((funcionario) => {
        alert('adicionado com sucesso');
        this.listarFuncionarios();
      });
    } else {
      let funcionarioEditado = new Funcionario(
        this.funcionarioSelecionado,
        name,
        email,
        null,
        birth_date
      );
      console.log(funcionarioEditado);
      this.funcionariosService.alterar(funcionarioEditado).subscribe((funcionario) => {
        alert('alterado com sucesso');
        this.listarFuncionarios();
      });
    }
    this.toggleModal();
  }

  toggleModal(type?: 'adicionar' | 'editar', funcionarioId?: number) {
    console.log(type);
    if (type) {
      this.modalType = type;
      if (funcionarioId) this.funcionarioSelecionado = funcionarioId;
    }
    this.showModal = !this.showModal;
  }

  openModalSalvar() {
    this.showModalSalvar = true;
  }

  closeModalSalvar() {
    this.showModalSalvar = false;
  }

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.funcionariosService.listarTodos().subscribe((funcionarios) => {
      this.funcionarios = funcionarios;
    });
  }
}
