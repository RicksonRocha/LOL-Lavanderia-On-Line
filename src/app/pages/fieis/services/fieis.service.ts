import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fieis } from 'src/app/shared/models/fieis.model';
import { environment as env } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FieisService {
  private BASE_URL = env.BASE_URL + 'clientes/fieis';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Fieis[]> {
    return this.httpClient.get<Fieis[]>(this.BASE_URL, this.httpOptions);
  }
}
