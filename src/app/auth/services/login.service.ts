import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login, User } from 'src/app/shared';

Injectable({
  providedIn: 'root',
});

const LS_KEY: string = 'userLogged';

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

  login({ login, password }: Login): Observable<User | null> {
    let user = new User(1, 'Rickson - Func', login, password, 'func');

    if (login == password) {
      if (login == 'admin') {
        user = new User(1, 'Rickson - Admin', login, password, 'admin');
        user = new User();
      } else if (login == 'gerente') {
        user = new User(1, 'Rickson - Gerente', login, password, 'gerente');
      }
      return of(user);
    } else {
      return of(null);
    }
  }
}
