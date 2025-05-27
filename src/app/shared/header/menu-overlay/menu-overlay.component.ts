import { Component, Input} from '@angular/core';
import { SocialLinksComponent } from '../../social-links/social-links.component';

@Component({
  selector: 'app-menu-overlay',
  imports: [SocialLinksComponent],
  templateUrl: './menu-overlay.component.html',
  styleUrl: './menu-overlay.component.scss'
})
export class MenuOverlayComponent {

    // @Input();
}
