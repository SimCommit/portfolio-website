import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { MainPageStateService } from './main-page/main-page-state.service';
import { CommonModule } from '@angular/common';
import { MenuOverlayComponent } from './overlays/menu-overlay/menu-overlay.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
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
    this.translate.use('en');
  }
  // this.translate.getBrowserLang() || 

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  closeBurgerOverlay(): void {
    setTimeout(() => {
      this.mainPageState.hideMenu = true;
    }, 300);
  }
}
