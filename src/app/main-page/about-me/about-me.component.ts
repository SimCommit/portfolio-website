import { Component } from '@angular/core';
import { AboutMeOverlayComponent } from './about-me-overlay/about-me-overlay.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  imports: [AboutMeOverlayComponent,TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
