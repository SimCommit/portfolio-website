import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { CommonModule } from '@angular/common';
import { MainPageStateService } from '../../main-page/main-page-state.service';
import { MenuOverlayComponent } from '../../overlays/menu-overlay/menu-overlay.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    SocialLinksComponent,
    MenuOverlayComponent,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  mainPageState = inject(MainPageStateService);

  isEnglish: Boolean = false;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');
  }

  // toggleLang(): void {
  //   this.isEnglish = !this.isEnglish;
  // }

  openMenu(): void {
    this.mainPageState.hideMenu = false;
  }

  toggleLanguage(): void {
    if (this.isEnglish) {
      this.isEnglish = false;
      this.translate.use('de');
    } else {
      this.isEnglish = true;
      this.translate.use('en');
    }
  }
}
