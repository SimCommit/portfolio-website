import { Component, ViewChild } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { MenuOverlayComponent } from './menu-overlay/menu-overlay.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [SocialLinksComponent, MenuOverlayComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // @ViewChild("menuOverlay") menuOverly: HTMLElement ;

  hideMenu: boolean = true;

  toggleMenu(): void {
    this.hideMenu = !this.hideMenu;
  }
}
