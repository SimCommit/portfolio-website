import { Component, Input} from '@angular/core';
import { SocialLinksComponent } from '../../social-links/social-links.component';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-menu-overlay',
  imports: [SocialLinksComponent, HeaderComponent],
  templateUrl: './menu-overlay.component.html',
  styleUrl: './menu-overlay.component.scss'
})
export class MenuOverlayComponent {

    // @Input();
}
