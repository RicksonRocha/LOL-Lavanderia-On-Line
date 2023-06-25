import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ITableHeads } from '../purchase/purchase.component';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { User } from 'src/app/shared';
import { Router } from '@angular/router';

export const TABLEHEADS: ITableHeads[] = [
  { title: 'Código' },
  { title: 'Nome' },
  { title: 'E-mail' },
  { title: 'CPF' },
  { title: 'Telefone' },
  { title: 'CEP' },
  { title: 'UF' },
  { title: 'Cidade' },
  { title: 'Bairro' },
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

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  @ViewChild('conteudo', { static: false }) conteudo: ElementRef;
  public tableHeads: ITableHeads[];
  public clientes: User[];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.tableHeads = TABLEHEADS;
    this.listarUsuariosCliente();
  }

  private listarUsuariosCliente() {
    this.usuarioService.listarUsuariosCliente().subscribe((usuariosClientes) => {
      this.clientes = usuariosClientes;
    });
  }

  public gerarPDF() {
    const doc = new jsPDF();

    const conteudo = this.conteudo.nativeElement;

    html2canvas(conteudo).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save(`Relatório Clientes - ${new Date().toLocaleDateString()}.pdf`);
    });
  }

  public voltar() {
    this.router.navigate(['/relatorios']);
  }
}
