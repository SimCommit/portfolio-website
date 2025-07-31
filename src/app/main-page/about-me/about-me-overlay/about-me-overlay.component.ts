import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserverService } from '../../../breakpoint-observer.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-about-me-overlay',
  imports: [TranslateModule, AsyncPipe],
  templateUrl: './about-me-overlay.component.html',
  styleUrl: './about-me-overlay.component.scss'
})
export class AboutMeOverlayComponent {

      constructor(public breakpointObserverService: BreakpointObserverService) {}
    

}
