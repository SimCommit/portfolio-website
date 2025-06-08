import { Component, inject } from '@angular/core';
import { MainPageStateService } from '../../main-page-state.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me-overlay',
  imports: [TranslateModule],
  templateUrl: './about-me-overlay.component.html',
  styleUrl: './about-me-overlay.component.scss'
})
export class AboutMeOverlayComponent {
    mainPageState = inject(MainPageStateService);

}
