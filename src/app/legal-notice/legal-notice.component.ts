import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  imports: [FooterComponent, RouterOutlet],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

}
