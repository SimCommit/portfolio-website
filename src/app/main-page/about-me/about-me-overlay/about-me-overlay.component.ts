import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PageStateService } from '../../../page-state.service';

@Component({
  selector: 'app-about-me-overlay',
  imports: [TranslateModule],
  templateUrl: './about-me-overlay.component.html',
  styleUrl: './about-me-overlay.component.scss'
})
export class AboutMeOverlayComponent {

      constructor(public pageStateService: PageStateService) {}
    

}
