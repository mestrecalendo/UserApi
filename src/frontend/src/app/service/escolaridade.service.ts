import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Escolaridade } from '../models/escolaridade';

@Injectable({
  providedIn: 'root'
})
export class EscolaridadeService {

  private url: string = 'https://localhost:7189/escolaridade';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private http: HttpClient) { }

  ListarEscolaridades(): Observable<Escolaridade[]> {
    return this.http.get<Escolaridade[]>(`${this.url}`, this.httpOptions)
  }

}
