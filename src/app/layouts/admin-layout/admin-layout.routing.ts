import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ClientComponent } from '../../pages/client/client.component';
import { PurchaseComponent } from 'src/app/pages/purchase/purchase.component';
import { AdminComponent } from '../../pages/admin/admin.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'client', component: ClientComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'admin', component: AdminComponent },
];
