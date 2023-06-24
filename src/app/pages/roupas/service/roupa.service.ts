import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roupa } from 'src/app/shared/models/roupa.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoupaService {
  private BASE_URL = env.BASE_URL + 'roupas';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Roupa[]> {
    return this.httpClient.get<Roupa[]>(this.BASE_URL, this.httpOptions);
  }

  remover(id: number): Observable<Roupa> {
    return this.httpClient.delete<Roupa>(this.BASE_URL + '/' + id, this.httpOptions);
  }

  inserir(roupa: Roupa): Observable<Roupa> {
    return this.httpClient.post<Roupa>(this.BASE_URL, JSON.stringify(roupa), this.httpOptions);
  }

  alterar(roupa: Roupa): Observable<Roupa> {
    return this.httpClient.put<Roupa>(
      this.BASE_URL + '/' + roupa.id,
      JSON.stringify(roupa),
      this.httpOptions
    );
  }
}
