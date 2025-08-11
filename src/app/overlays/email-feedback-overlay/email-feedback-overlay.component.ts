import { Component, EventEmitter, Output } from "@angular/core";
import { MainPageScrollService } from "../../main-page/main-page-scroll.service";
import { PageStateService } from "../../page-state.service";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-email-feedback-overlay",
  imports: [CommonModule, TranslateModule],
  templateUrl: "./email-feedback-overlay.component.html",
  styleUrl: "./email-feedback-overlay.component.scss",
})
export class EmailFeedbackOverlayComponent {
  @Output() closeOrder = new EventEmitter<boolean>();

  constructor(public mainPageScrollService: MainPageScrollService, public pageStateService: PageStateService) {}

  closeFromOverlay() {
    this.closeOrder.emit();
    this.pageStateService.emailFeedbackIsOpen = false;
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
