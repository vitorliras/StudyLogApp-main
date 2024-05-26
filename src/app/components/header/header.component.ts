import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuOpen = false;
  options = [
    { title: 'Início', endpoint: '/' },
    { title: 'Conhecimentos Especifícos', endpoint: '/conhecimentos-especificos' },
    { title: 'Noções Criminalista', endpoint: '/noces-criminalista' },
    { title: 'Noções de Medicina Legal', endpoint: '/noces-medicina-legal' },
    { title: 'Noções de Direito Penal', endpoint: '/noces-direito-penal' },
    { title: 'Noções De Direito Processual Penal', endpoint: '/noces-direito-processual-penal' },
    { title: 'Língua Portuguesa', endpoint: '/lingua-portuguesa' },
    { title: 'Raciocínio Lógico', endpoint: '/raciocinio-logico' },
    { title: 'Noções de Documentos Técnicos', endpoint: '/noces-documentos-tecnicos' }
  ];
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  tela(endpoint: string){
    this.router.navigate([endpoint])
  }

}
