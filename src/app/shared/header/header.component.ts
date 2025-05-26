import { Component } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
  selector: 'app-header',
  imports: [SocialLinksComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  openBurgerMenu() {
    
  }
}
