import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/shared/models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  private BASE_URL = 'http://localhost:3000/funcionarios';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.BASE_URL, this.httpOptions);
  }

  remover(id: number): Observable<Funcionario> {
    return this.httpClient.delete<Funcionario>(this.BASE_URL + id, this.httpOptions);
  }

  inserir(Funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.BASE_URL, JSON.stringify(Funcionario), this.httpOptions);
  }

  alterar(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(
      this.BASE_URL + funcionario.id,
      JSON.stringify(funcionario),
      this.httpOptions
    );
  }
}
