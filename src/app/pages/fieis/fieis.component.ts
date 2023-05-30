import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ITableHeads } from '../purchase/purchase.component';

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Código' },
  { title: 'Nome' },
  { title: 'E-mail' },
  { title: 'Quantidade total de pedidos' },
  { title: 'Valor total comprado' },
];

export type IFieis = {
  codigo: number;
  nome: string;
  email: string;
  quantidade: string;
  valor: string;
};

const FIEIS: IFieis[] = [
  {
    codigo: 1,
    nome: 'Fulano',
    email: 'fulano@gmail.com',
    quantidade: '20',
    valor: 'R$ 850,00',
  },
  {
    codigo: 2,
    nome: 'Beltrano',
    email: 'beltrano@gmail.com',
    quantidade: '15',
    valor: 'R$ 590,00',
  },
  {
    codigo: 3,
    nome: 'Ciclano',
    email: 'ciclano@gmail.com',
    quantidade: '10',
    valor: 'R$ 420,00',
  },
];

@Component({
  selector: 'app-fieis',
  templateUrl: './fieis.component.html',
  styleUrls: ['./fieis.component.scss'],
})
export class FieisComponent implements OnInit {
  @ViewChild('conteudo', { static: false }) conteudo: ElementRef;
  public tableHeads: ITableHeads[];
  public fieis: IFieis[];

  constructor() {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.fieis = FIEIS;
  }

  gerarPDF() {
    const doc = new jsPDF();

    const conteudo = this.conteudo.nativeElement;

    html2canvas(conteudo).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('Relatório de clientes fieis.pdf');
    });
  }
}
