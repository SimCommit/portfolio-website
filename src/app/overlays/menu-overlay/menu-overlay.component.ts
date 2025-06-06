import { Component, EventEmitter, Output } from '@angular/core';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';

@Component({
  selector: 'app-menu-overlay',
  imports: [SocialLinksComponent],
  templateUrl: './menu-overlay.component.html',
  styleUrl: './menu-overlay.component.scss'
})
export class MenuOverlayComponent {

  @Output() closeOrder = new EventEmitter<boolean>();

  closeFromOverlay() {
    this.closeOrder.emit();
  }

  prevent(event:Event) {
    event.stopPropagation();
}
}