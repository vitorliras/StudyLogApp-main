import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  API = "https://viacep.com.br/ws/";

  constructor(private http: HttpClient) { }

getConsultaCep(cep: string){
  debugger;
  return this.http.get(`${this.API}${cep}/json`)
}

}
