import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenuOverlayComponent } from "./overlays/menu-overlay/menu-overlay.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { marker as _ } from "@colsen1991/ngx-translate-extract-marker";
import { filter } from "rxjs";
import { PageStateService } from "./page-state.service";
import { MainPageScrollService } from "./main-page/main-page-scroll.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, MenuOverlayComponent, CommonModule, TranslateModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title: string = "portfolio-website";

  body: HTMLElement = document.body;

  constructor(
    private translate: TranslateService,
    private router: Router,
    public pageStateService: PageStateService,
    private mainPageScrollService: MainPageScrollService
  ) {
    this.translate.addLangs(["de", "en"]);
    this.translate.setDefaultLang("en");
    this.translate.use("en");

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (
          ["/legal-notice/en", "/legal-notice/de", "/privacy-policy/en", "/privacy-policy/de"].includes(
            event.urlAfterRedirects
          )
        ) {
          this.body.classList.add("scroll-unlocked");
        } else {
          this.body.classList.remove("scroll-unlocked");
        }
      });
  }
  // this.translate.getBrowserLang() ||

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  closeBurgerOverlay(): void {
    this.mainPageScrollService.unlockScroll();
    setTimeout(() => {
      this.pageStateService.hideMenu = true;
    }, 300);
  }
}
