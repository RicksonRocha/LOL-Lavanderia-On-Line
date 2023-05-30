import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ITableHeads } from '../purchase/purchase.component';

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Código' },
  { title: 'Nome' },
  { title: 'E-mail' },
  { title: 'CPF' },
  { title: 'Telefone' },
  { title: 'CEP' },
  { title: 'UF' },
  { title: 'Cidade' },
  { title: 'Rua' },
];

export type ICliente = {
  codigo: number;
  nome: string;
  email: string;
  CPF: string;
  telefone: string;
  CEP: number;
  UF: string;
  cidade: string;
  rua: string;
};

const CLIENTES: ICliente[] = [
  {
    codigo: 1,
    nome: 'Fulano',
    email: 'fulano@gmail.com',
    CPF: '111.111.111-11',
    telefone: '(11) 1111-1111',
    CEP: 80000000,
    UF: 'SP',
    cidade: 'São Paulo',
    rua: 'Rua das almas',
  },
  {
    codigo: 2,
    nome: 'Beltrano',
    email: 'beltrano@gmail.com',
    CPF: '222.222.222-22',
    telefone: '(22) 2222-2222',
    CEP: 80000001,
    UF: 'RJ',
    cidade: 'Volta Redonda',
    rua: 'Rua das cruzes',
  },
  {
    codigo: 3,
    nome: 'Ciclano',
    email: 'ciclano@gmail.com',
    CPF: '333.333.333-33',
    telefone: '(33) 3333-3333',
    CEP: 80000002,
    UF: 'MG',
    cidade: 'Divinópolis',
    rua: 'Rua das luas',
  },
];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  @ViewChild('conteudo', { static: false }) conteudo: ElementRef;
  public tableHeads: ITableHeads[];
  public cliente: ICliente[];

  constructor() {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.cliente = CLIENTES;
  }

  gerarPDF() {
    const doc = new jsPDF();

    const conteudo = this.conteudo.nativeElement;

    html2canvas(conteudo).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('Relatório Clientes.pdf');
    });
  }
}
