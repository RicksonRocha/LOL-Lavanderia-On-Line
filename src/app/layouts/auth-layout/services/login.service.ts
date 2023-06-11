import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login, User } from 'src/app/shared';

const LS_KEY: string = 'userLogged';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public get userLogged(): User {
    let user = localStorage[LS_KEY];
    return user ? JSON.parse(user) : null;
  }

  public set userLogged(user: User) {
    localStorage[LS_KEY] = JSON.stringify(user);
  }

  logout() {
    delete localStorage[LS_KEY];
  }

  login(login: Login): Observable<User | null> {
    let user = new User(1, 'Usuário - Cliente', login.login, login.password, 'cliente');

    if (login.login == login.password) {
      if (login.login == 'admin') {
        user = new User(2, 'Usuário - Admin', login.login, login.password, 'admin');
      } else if (login.login == 'gerente') {
        user = new User(3, 'Usuário - Gerente', login.login, login.password, 'func');
      }
      return of(user);
    } else {
      return of(null);
    }
  }
}
