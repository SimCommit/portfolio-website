import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { CommonModule } from '@angular/common';
import { MainPageScrollService } from '../../main-page/main-page-scroll.service';
import { PageStateService } from '../../page-state.service';

@Component({
  selector: 'app-menu-overlay',
  imports: [SocialLinksComponent, CommonModule],
  templateUrl: './menu-overlay.component.html',
  styleUrl: './menu-overlay.component.scss',
})
export class MenuOverlayComponent {

  @Output() closeOrder = new EventEmitter<boolean>();

  constructor(public mainPageScrollService: MainPageScrollService, public pageStateService: PageStateService) {}

  closeFromOverlay() {
    this.closeOrder.emit();
    this.pageStateService.burgerMenuIsOpen = false;
    this.mainPageScrollService.unlockScroll();
  }

  prevent(event: Event) {
    event.stopPropagation();
  }
}
