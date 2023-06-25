import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ITableHeads } from '../purchase/purchase.component';
import { dateFormatter } from '../utils';
import { PedidoService } from '../dashboard/service/pedido.service';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { Router } from '@angular/router';

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Numero pedido' },
  { title: 'Cliente' },
  { title: 'Data' },
  { title: 'Preço total do pedido' },
];

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss'],
})
export class ReceitaComponent implements OnInit {
  @ViewChild('conteudo', { static: false }) conteudo: ElementRef;
  public tableHeads: ITableHeads[];
  public receita: Pedido[];
  public finalPrice: number;

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.listarPedidosReceita();
  }

  private listarPedidosReceita() {
    this.pedidoService.listarTodos().subscribe((pedidos) => {
      const pagos = pedidos.filter((pedido) => pedido.status == 'PAGO');
      this.receita = pagos;
      this.finalPrice = pagos.reduce((prev, pedido) => prev + pedido.price, 0);
    });
  }

  public voltar() {
    this.router.navigate(['/relatorios']);
  }

  gerarPDF() {
    const doc = new jsPDF();

    const conteudo = this.conteudo.nativeElement;

    html2canvas(conteudo).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('Relatório de Receita.pdf');
    });
  }
}
