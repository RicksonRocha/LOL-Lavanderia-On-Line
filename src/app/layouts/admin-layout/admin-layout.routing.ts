import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClientComponent } from '../../pages/client/client.component';
import { InitialClientComponent } from '../../pages/initial-client/client.component';
import { PurchaseComponent } from 'src/app/pages/purchase/purchase.component';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { RoupasComponent } from 'src/app/pages/roupas/roupas.component';
import { FuncionariosComponent } from 'src/app/pages/funcionarios/funcionarios.component';
import { RelatoriosComponent } from 'src/app/pages/relatorios/relatorios.component';
import { ReceitaComponent } from 'src/app/pages/receita/receita.component';
import { ClientesComponent } from 'src/app/pages/clientes/clientes.component';
import { FieisComponent } from 'src/app/pages/fieis/fieis.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client', component: ClientComponent },
  { path: 'initial-client', component: InitialClientComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'roupas', component: RoupasComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'receita', component: ReceitaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'fieis', component: FieisComponent },
];
