import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/layouts/auth-layout/services/login.service';
import { Login } from 'src/app/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('formLogin') formLogin!: NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    if (this.loginService.userLogged) {
      this.router.navigate(['/initial-client']);
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['error'];
    });
  }

  logar(): void {
    this.loading = true;

    const { login, password } = this.formLogin.form.value;
    if (login !== undefined && password !== undefined) {
      this.loginService.login({ login, password }).subscribe((usu) => {
        if (usu != null) {
          this.loginService.userLogged = usu;
          this.loading = false;
          this.router.navigate(['/initial-client']);
        } else {
          this.message = 'Usuário/Senha inválidos.';
        }
      });
    } else {
      this.message = 'Preencha os campos de login para acessar o sistema';
    }
    this.loading = false;
  }
  ngOnDestroy() {}
}
