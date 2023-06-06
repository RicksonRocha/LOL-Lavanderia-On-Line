import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AdminComponent } from './pages/admin/admin.component';
import { RoupasComponent } from './pages/roupas/roupas.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { ReceitaComponent } from './pages/receita/receita.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { InitialClientComponent } from './pages/initial-client/client.component';
import { FieisComponent } from './pages/fieis/fieis.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AdminComponent,
    RoupasComponent,
    FuncionariosComponent,
    RelatoriosComponent,
    ReceitaComponent,
    ClientesComponent,
    FieisComponent,
    InitialClientComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
