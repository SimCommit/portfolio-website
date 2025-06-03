import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { MenuOverlayComponent } from "./shared/header/menu-overlay/menu-overlay.component";
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageStateService } from './main-page/main-page-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MenuOverlayComponent, MainPageComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-website';

    mainPageState = inject(MainPageStateService);

}
