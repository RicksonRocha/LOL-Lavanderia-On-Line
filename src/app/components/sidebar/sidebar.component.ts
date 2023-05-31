import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/initial-client',
    title: 'Página Inicial - Cliente',
    icon: 'ni-tv-2 text-primary',
    class: '',
  },
  { path: '/client', title: 'Filtro de pedidos', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/dashboard', title: 'Pedido Online', icon: 'fa fa-shopping-cart text-green', class: '' },
  { path: '/purchase', title: 'Consulta Pedido', icon: 'ni ni-shop text-red', class: '' },
  {
    path: '/admin',
    title: 'Página Inicial - Funcionário',
    icon: 'ni-tv-2 text-primary',
    class: '',
  },
  { path: '/roupas', title: 'Roupas', icon: 'ni ni-shop text-red', class: '' },
  {
    path: '/funcionarios',
    title: 'Funcionários',
    icon: 'fa fa-shopping-cart text-green',
    class: '',
  },
  { path: '/relatorios', title: 'Relatórios', icon: 'ni-tv-2 text-primary', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
