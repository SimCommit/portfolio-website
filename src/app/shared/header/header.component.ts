import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { CommonModule } from '@angular/common';
import { MainPageStateService } from '../../main-page/main-page-state.service';
import { MenuOverlayComponent } from '../../overlays/menu-overlay/menu-overlay.component';

@Component({
  selector: 'app-header',
  imports: [SocialLinksComponent, MenuOverlayComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  mainPageState = inject(MainPageStateService);

  isEnglish: Boolean = false; 

  toggleLang():void {
    this.isEnglish = !this.isEnglish;
  }

  openMenu(): void {
    this.mainPageState.hideMenu = false;
  }
}
