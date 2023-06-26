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
  public receitaFiltrada: Pedido[];
  public finalPrice: number;
  public initialDate: string;
  public finalDate: string;

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.listarPedidosReceita();
  }

  private updateFinalPrice(pedidos) {
    this.finalPrice = pedidos.reduce((prev, pedido) => prev + pedido.price, 0);
  }

  private listarPedidosReceita() {
    this.pedidoService.listarTodos().subscribe((pedidos) => {
      const pagos = pedidos.filter((pedido) => pedido.status == 'FINALIZADO');
      this.receita = pagos;
      this.receitaFiltrada = pagos;
      this.updateFinalPrice(pagos);
    });
  }

  private filtrarPedidosDatas(initialDate, finalDate) {
    this.receitaFiltrada = this.receita.filter((order) => {
      const orderDate = new Date(order.data).getTime();
      const startDate = new Date(initialDate).getTime();
      const endDate = new Date(finalDate).getTime();
      const isBetweenDates = orderDate >= startDate && orderDate <= endDate;
      if (isBetweenDates) {
        return order;
      }
    });
  }

  public handleChangeDate(event) {
    const { name, value } = event.target;
    if (name === 'initialDate') {
      this.initialDate = value;
    } else {
      this.finalDate = value;
    }
  }

  public handleClickDates() {
    this.filtrarPedidosDatas(this.initialDate, this.finalDate);
    this.updateFinalPrice(this.receitaFiltrada);
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

      let title = 'Relatório de Receita';
      if (this.initialDate) title += ` ${this.initialDate}`;
      if (this.finalDate) title += ` ${this.finalDate}`;
      doc.save(`${title}.pdf`);
    });
  }
}
