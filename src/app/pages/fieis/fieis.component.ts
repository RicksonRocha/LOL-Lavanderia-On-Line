import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ITableHeads } from '../purchase/purchase.component';
import { FieisService } from './services/fieis.service';
import { Fieis } from 'src/app/shared/models/fieis.model';

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Código' },
  { title: 'Nome' },
  { title: 'E-mail' },
  { title: 'Quantidade total de pedidos' },
  { title: 'Valor total comprado' },
];
@Component({
  selector: 'app-fieis',
  templateUrl: './fieis.component.html',
  styleUrls: ['./fieis.component.scss'],
})
export class FieisComponent implements OnInit {
  @ViewChild('conteudo', { static: false }) conteudo: ElementRef;
  public tableHeads: ITableHeads[];
  public fieis: Fieis[];

  constructor(private fieisService: FieisService) {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.fieis = [];
    this.listarFieis();
  }

  listarFieis(): void {
    this.fieisService.listarTodos().subscribe((fieis) => {
      this.fieis = fieis;
    });
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
