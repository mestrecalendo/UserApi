import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'https://localhost:7189/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private http: HttpClient) { }

  cadastrarNovoUsuario(novoUsuario: User): Observable<User> {
    return this.http.post<User>(this.url, novoUsuario, this.httpOptions)
  }

  AtualizarUsuario(id:  number, novoUsuario: User): Observable<any> {
    return this.http.put(`${this.url}/${id}`, novoUsuario, this.httpOptions)
  }

  GetUsuarioById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`, this.httpOptions)
  }

  ListarUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`, this.httpOptions)
  }

  ExcluirUsuario(id: number) {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions)
  }
}
