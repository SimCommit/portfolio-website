import { Component, EventEmitter, inject, Output } from "@angular/core";
import { SocialLinksComponent } from "../../shared/social-links/social-links.component";
import { CommonModule } from "@angular/common";
import { MainPageScrollService } from "../../main-page/main-page-scroll.service";
import { PageStateService } from "../../page-state.service";
import { BreakpointObserverService } from "../../breakpoint-observer.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-menu-overlay",
  imports: [SocialLinksComponent, CommonModule, TranslateModule],
  templateUrl: "./menu-overlay.component.html",
  styleUrl: "./menu-overlay.component.scss",
})
export class MenuOverlayComponent {
  @Output() closeOrder = new EventEmitter<boolean>();

  constructor(
    public mainPageScrollService: MainPageScrollService,
    public pageStateService: PageStateService,
    public breakpointObserverService: BreakpointObserverService
  ) {}

  closeFromOverlay() {
    this.closeOrder.emit();
    this.pageStateService.burgerMenuIsOpen = false;
    this.mainPageScrollService.unlockScroll();
    this.showOverflowOnBody();
  }

  showOverflowOnBody() {
    const body: HTMLElement = document.body;
    body.classList.remove("scroll-locked");
  }

  prevent(event: Event) {
    event.stopPropagation();
  }
}
