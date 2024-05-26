import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubAssunto } from '../models/subAssunto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubSubAssuntoServiceService {

  apiUrl = environment.url + 'subAssunto/'

  constructor(private http: HttpClient) { }

  getAllSubAssunto(): Observable<SubAssunto[]> {
    return this.http.get<SubAssunto[]>(this.apiUrl);
  }

  getSubAssuntoById(id: number): Observable<SubAssunto> {
    return this.http.get<SubAssunto>(`${this.apiUrl}${id}`);
  }

  createSubAssunto(subAssunto: SubAssunto): Observable<SubAssunto> {
   
    return this.http.post<SubAssunto>(this.apiUrl, subAssunto);
  }

  updateSubAssunto(subAssunto: SubAssunto): Observable<SubAssunto> {
    return this.http.put<SubAssunto>(`${this.apiUrl}${subAssunto.id}`, subAssunto);
  }

  deleteSubAssunto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
