import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { MenuOverlayComponent } from './menu-overlay/menu-overlay.component';
import { CommonModule } from '@angular/common';
import { MainPageStateService } from '../../main-page/main-page-state.service';

@Component({
  selector: 'app-header',
  imports: [SocialLinksComponent, MenuOverlayComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  mainPageState = inject(MainPageStateService);

  hideMenu: boolean = true;

  isEnglish: Boolean = false; 

  toggleLang():void {
    this.isEnglish = !this.isEnglish;
  }

  toggleMenu(): void {
    this.hideMenu = !this.hideMenu;
  }
}
