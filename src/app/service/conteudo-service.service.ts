import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conteudo } from '../models/conteudo';

@Injectable({
  providedIn: 'root'
})
export class ConteudoServiceService {

  apiUrl = environment.url + 'conteudo/'

  constructor(private http: HttpClient) { }

  getAllConteudo(): Observable<Conteudo[]> {
    return this.http.get<Conteudo[]>(this.apiUrl);
  }

  getConteudoById(id: number): Observable<Conteudo> {
    return this.http.get<Conteudo>(`${this.apiUrl}${id}`);
  }

  createConteudo(conteudo: Conteudo): Observable<Conteudo> {
   
    return this.http.post<Conteudo>(this.apiUrl, conteudo);
  }

  updateConteudo(id: number, conteudo: Conteudo): Observable<Conteudo> {
    return this.http.put<Conteudo>(`${this.apiUrl}${id}`, conteudo);
  }

  deleteConteudo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

}
