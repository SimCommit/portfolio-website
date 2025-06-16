import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SocialLinksComponent } from '../../shared/social-links/social-links.component';
import { CommonModule } from '@angular/common';
import { MainPageStateService } from '../../main-page/main-page-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-overlay',
  imports: [SocialLinksComponent, CommonModule],
  templateUrl: './menu-overlay.component.html',
  styleUrl: './menu-overlay.component.scss',
})
export class MenuOverlayComponent {
  mainPageState = inject(MainPageStateService);

  @Output() closeOrder = new EventEmitter<boolean>();

  constructor() {}

  closeFromOverlay() {
    this.closeOrder.emit();
    this.mainPageState.burgerMenuIsOpen = false;
  }

  prevent(event: Event) {
    event.stopPropagation();
  }

}
