import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { CommonModule } from '@angular/common';
import { MainPageStateService } from '../../main-page/main-page-state.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SocialLinksComponent, CommonModule, TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  mainPageState = inject(MainPageStateService);

  constructor(private translate: TranslateService) {
  }

  openMenu(): void {
    this.mainPageState.hideMenu = false;
  }

  toggleLanguage(): void {
    if (this.mainPageState.currentLanguage === 'en') {
      this.translate.use('de');
      this.mainPageState.currentLanguage = 'de';
    } else {
      this.translate.use('en');
      this.mainPageState.currentLanguage = 'en';
    }
  }
}
