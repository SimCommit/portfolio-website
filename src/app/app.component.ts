import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageStateService } from './main-page/main-page-state.service';
import { CommonModule } from '@angular/common';
import { MenuOverlayComponent } from './overlays/menu-overlay/menu-overlay.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    MenuOverlayComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio-website';

  mainPageState = inject(MainPageStateService);

  closeMenu(): void {
    this.mainPageState.hideMenu = true;
  }
}
