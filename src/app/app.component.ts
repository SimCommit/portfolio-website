import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageStateService } from './main-page/main-page-state.service';
import { CommonModule } from '@angular/common';
import { MenuOverlayComponent } from './overlays/menu-overlay/menu-overlay.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    MenuOverlayComponent,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio-website';

  mainPageState = inject(MainPageStateService);

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  closeMenu(): void {
    this.mainPageState.hideMenu = true;
  }
}
