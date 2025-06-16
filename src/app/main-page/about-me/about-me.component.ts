import { Component, inject } from '@angular/core';
import { AboutMeOverlayComponent } from './about-me-overlay/about-me-overlay.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MainPageStateService } from '../main-page-state.service';

@Component({
  selector: 'app-about-me',
  imports: [AboutMeOverlayComponent, TranslateModule, CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  mainPageState = inject(MainPageStateService);

  emojiIsHovered: boolean = false;

  changeHoverState(state: boolean): void {
    this.emojiIsHovered = state;
  }
}
