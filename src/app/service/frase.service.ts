import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Frase } from '../models/frase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraseService {

  apiUrl = environment.url + 'frase/'


  constructor(private http: HttpClient) { }

  getAllFrase(): Observable<Frase[]> {
    return this.http.get<Frase[]>(this.apiUrl);
  }

  updateFrase(frase: Frase): Observable<Frase> {
    return this.http.put<Frase>(`${this.apiUrl}${frase.id}`, frase);
  }


}
