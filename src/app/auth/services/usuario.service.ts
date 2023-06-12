import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  BASE_URL = 'http://localhost:3000/usuarios/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<User> {
    return this.httpClient.get<User>(this.BASE_URL + id, this.httpOptions);
  }

  inserir(usuario: User): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL, JSON.stringify(usuario), this.httpOptions);
  }

  remover(id: number): Observable<User> {
    return this.httpClient.delete<User>(this.BASE_URL + id, this.httpOptions);
  }

  alterar(usuario: User): Observable<User> {
    return this.httpClient.put<User>(
      this.BASE_URL + usuario.id,
      JSON.stringify(usuario),
      this.httpOptions
    );
  }
}
