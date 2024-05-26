import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assunto } from '../models/assunto';

@Injectable({
  providedIn: 'root'
})
export class AssuntoServiceService {

  apiUrl = environment.url + 'assunto/'

  constructor(private http: HttpClient) { }

  getAllAssunto(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.apiUrl);
  }

  getAssuntoById(id: number): Observable<Assunto> {
    return this.http.get<Assunto>(`${this.apiUrl}${id}`);
  }

  createAssunto(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.apiUrl, assunto);
  }

  updateAssunto(assunto: Assunto): Observable<Assunto> {
    return this.http.put<Assunto>(`${this.apiUrl}${assunto.id}`, assunto);
  }

  deleteAssunto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
