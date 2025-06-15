import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MainPageStateService } from './main-page/main-page-state.service';
import { CommonModule } from '@angular/common';
import { MenuOverlayComponent } from './overlays/menu-overlay/menu-overlay.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';
import { filter } from 'rxjs';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuOverlayComponent, CommonModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio-website';

  mainPageState = inject(MainPageStateService);

  constructor(private translate: TranslateService, private router: Router) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const body = document.body;

        if (
          ['/legal-notice/en', '/legal-notice/de', '/privacy-policy/en', '/privacy-policy/de'].includes(event.urlAfterRedirects)
        ) {
          body.classList.add('scroll-unlocked');
        } else {
          body.classList.remove('scroll-unlocked');
        }
      });
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
