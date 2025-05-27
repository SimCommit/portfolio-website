import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { MenuOverlayComponent } from "./shared/header/menu-overlay/menu-overlay.component";
import { HeroComponent } from './main-page/hero/hero.component';
import { MainPageComponent } from './main-page/main-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MenuOverlayComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-website';
}
