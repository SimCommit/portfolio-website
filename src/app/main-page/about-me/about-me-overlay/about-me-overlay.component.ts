import { Component, inject } from '@angular/core';
import { MainPageStateService } from '../../main-page-state.service';

@Component({
  selector: 'app-about-me-overlay',
  imports: [],
  templateUrl: './about-me-overlay.component.html',
  styleUrl: './about-me-overlay.component.scss'
})
export class AboutMeOverlayComponent {
    mainPageState = inject(MainPageStateService);

}
