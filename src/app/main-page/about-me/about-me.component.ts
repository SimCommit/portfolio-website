import { Component } from '@angular/core';
import { AboutMeOverlayComponent } from './about-me-overlay/about-me-overlay.component';
import { PrimaryButtonComponent } from '../../shared/primary-button/primary-button.component';

@Component({
  selector: 'app-about-me',
  imports: [AboutMeOverlayComponent, PrimaryButtonComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
