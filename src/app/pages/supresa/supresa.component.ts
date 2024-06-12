import { Component } from '@angular/core';

@Component({
  selector: 'app-supresa',
  templateUrl: './supresa.component.html',
  styleUrls: ['./supresa.component.css']
})
export class SupresaComponent {
  photos = [
    { src: 'assets/ft1.jpg', alt: 'foto' },
    { src: 'assets/ft13.jpg', alt: 'foto' },
    { src: 'assets/ft2.jpg', alt: 'foto' },
    { src: 'assets/ft3.jpg', alt: 'foto' },
    { src: 'assets/ft4.jpg', alt: 'foto' },
    { src: 'assets/ft5.jpg', alt: 'foto' },
    { src: 'assets/ft6.jpg', alt: 'foto' },
    { src: 'assets/ft7.jpg', alt: 'foto' },
    { src: 'assets/ft8.jpg', alt: 'foto' },
    { src: 'assets/ft9.jpg', alt: 'foto' },
    { src: 'assets/ft10.jpg', alt: 'foto' },
    { src: 'assets/ft11.jpg', alt: 'foto' },
    { src: 'assets/ft12.jpg', alt: 'foto' },
  ];

  currentIndex = 0;
  slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 10000); 
  }

  nextSlide() {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.photos.length - 1;
    }
  }

}
