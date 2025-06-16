import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { CommonModule } from '@angular/common';
import { MainPageStateService } from '../../main-page/main-page-state.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SocialLinksComponent, CommonModule, TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  mainPageState = inject(MainPageStateService);


  constructor(private translate: TranslateService, private router: Router) {}

  openBurgerOverlay(): void {
    this.mainPageState.hideMenu = false;
  }

  /**
   * Opens the burger menu by setting the `burgerMenuIsOpen` flag after a short "delay".
   *
   * @property {boolean} mainPageState.burgerMenuIsOpen
   *   Indicates whether the burger menu is currently open.
   *
   * Note: This uses a `setTimeout(..., 0)` workaround to defer the state change until
   * the overlay is fully rendered. Without this delay, the menu might slide in too early,
   * before the overlay becomes visible.
   */
  openBurgerMenu(): void {
    this.mainPageState.lockScroll();  
    setTimeout(() => {
      this.mainPageState.burgerMenuIsOpen = true;
    }, 0);
  }

  toggleLanguage(): void {
    if (this.mainPageState.currentLanguage === 'en') {
      this.translate.use('de');
      this.mainPageState.currentLanguage = 'de';
    } else {
      this.translate.use('en');
      this.mainPageState.currentLanguage = 'en';
    }
    this.toggleLanguageLegalPages();
  }

  toggleLanguageLegalPages(): void {
    console.log(this.router.url);

    if (
      this.router.url === '/legal-notice/en' ||
      this.router.url === '/legal-notice/de'
    ) {
      this.router.navigate([
        '/legal-notice',
        this.mainPageState.currentLanguage,
      ]);
    }

    if (
      this.router.url === '/privacy-policy/en' ||
      this.router.url === '/privacy-policy/de'
    ) {
      this.router.navigate([
        '/privacy-policy',
        this.mainPageState.currentLanguage,
      ]);
    }
  }
}

// currentPage: "main-page" | "legal-notice" | "privacy-policy" = "main-page";
