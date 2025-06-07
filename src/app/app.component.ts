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
  // title = 'portfolio-website';

  mainPageState = inject(MainPageStateService);

  // #region ngx-translate demo
  title = 'translation-demo';
  name = 'Andreas';
  private subscription: Subscription;

  // #endregion

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');

    // for testing ngx:
    this.translate
      .get(_('demo.interpolation.pipe-with-parameters'), { name: 'John' })
      .subscribe((text: string) => {
        console.log(`using get(): ${text}`);
      });
    const text = translate.instant(
      _('demo.interpolation.pipe-with-parameters'),
      { name: 'John' }
    );
    console.log(`using instant(): ${text}`);

    translate
      .get(_('demo.interpolation.pipe-with-parameters'), { name: 'John' })
      .subscribe((text: string) => {
        console.log(`using get(): ${text}`);

        // translations are alreaedy loaded - you can now use instant()
        const text2 = translate.instant(
          _('demo.interpolation.pipe-with-parameters'),
          { name: 'John' }
        );
        console.log(`using instant() inside the promise: ${text2}`);
      });
    this.subscription = translate
      .stream(_('demo.interpolation.pipe-with-parameters'), { name: 'John' })
      .subscribe((text: string) => {
        console.log(`using stream(): ${text}`);
      });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  closeMenu(): void {
    this.mainPageState.hideMenu = true;
  }
}
