import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   isMenuOpen: boolean = false;

   toggleMenu() {
     this.isMenuOpen = !this.isMenuOpen;
   }
 
   closeMenu() {
     this.isMenuOpen = false;
   }
}
