import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClientComponent } from '../../pages/client/client.component';
import { PurchaseComponent } from 'src/app/pages/purchase/purchase.component';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { RoupasComponent } from 'src/app/pages/roupas/roupas.component';
import { FuncionariosComponent } from 'src/app/pages/funcionarios/funcionarios.component';
import { RelatoriosComponent } from 'src/app/pages/relatorios/relatorios.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client', component: ClientComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'roupas', component: RoupasComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'relatorios', component: RelatoriosComponent },
];
