import { Component } from "@angular/core";
import { SocialLinksComponent } from "../social-links/social-links.component";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Router, RouterLink } from "@angular/router";
import { MainPageScrollService } from "../../main-page/main-page-scroll.service";
import { PageStateService } from "../../page-state.service";
import { BreakpointObserverService } from "../../breakpoint-observer.service";

@Component({
  selector: "app-header",
  imports: [SocialLinksComponent, CommonModule, TranslateModule, RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  body: HTMLElement = document.body;

  constructor(
    private translate: TranslateService,
    private router: Router,
    public mainPageScrollService: MainPageScrollService,
    public pageStateService: PageStateService,
    public breakpointObserverService: BreakpointObserverService
  ) {}

  openBurgerOverlay(): void {
    this.pageStateService.hideMenu = false;
  }

  /**
   * Opens the burger menu by setting the `burgerMenuIsOpen` flag after a short "delay".
   *
   * @property {boolean} mainPageState.burgerMenuIsOpen
   *   Indicates whether the burger menu is currently open.
   *
   * Note: This uses a `setTimeout(..., 0)` workaround to defer the state change until
   * the overlay is fully rendered. Without this delay, the menu might slide in too early,
   * before the overlay becomes visible.
   */
  openBurgerMenu(): void {
    this.mainPageScrollService.lockScroll();
    this.hideOverflowOnBody();
    setTimeout(() => {
      this.pageStateService.burgerMenuIsOpen = true;
    }, 0);
  }

  hideOverflowOnBody() {
    this.body.classList.add("scroll-locked");
  }

  toggleLanguage(): void {
    if (this.pageStateService.currentLanguage === "en") {
      this.translate.use("de");
      this.pageStateService.currentLanguage = "de";
    } else {
      this.translate.use("en");
      this.pageStateService.currentLanguage = "en";
    }
    this.toggleLanguageLegalPages();
  }

  toggleLanguageLegalPages(): void {
    // console.log(this.router.url);

    if (this.router.url === "/legal-notice/en" || this.router.url === "/legal-notice/de") {
      this.router.navigate(["/legal-notice", this.pageStateService.currentLanguage]);
    }

    if (this.router.url === "/privacy-policy/en" || this.router.url === "/privacy-policy/de") {
      this.router.navigate(["/privacy-policy", this.pageStateService.currentLanguage]);
    }
  }
}

// currentPage: "main-page" | "legal-notice" | "privacy-policy" = "main-page";
