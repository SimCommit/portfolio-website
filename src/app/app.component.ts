import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenuOverlayComponent } from "./overlays/menu-overlay/menu-overlay.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { marker as _ } from "@colsen1991/ngx-translate-extract-marker";
import { filter } from "rxjs";
import { PageStateService } from "./page-state.service";
import { MainPageScrollService } from "./main-page/main-page-scroll.service";
import { EmailFeedbackOverlayComponent } from "./overlays/email-feedback-overlay/email-feedback-overlay.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, MenuOverlayComponent, CommonModule, TranslateModule, EmailFeedbackOverlayComponent],
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
  }

  ngOnInit(): void {
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
    this.logWelcomeMessage();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  closeBurgerOverlay(): void {
    this.mainPageScrollService.unlockScroll();
    setTimeout(() => {
      this.pageStateService.hideMenu = true;
    }, 300);
  }

  closeEmailFeedbackOverlay(): void {
    this.mainPageScrollService.unlockScroll();
    setTimeout(() => {
      this.pageStateService.hideEmailFeedback = true;
    }, 300);
  }

  logWelcomeMessage() {
    console.log(
      "%cHey there!%c\n\nCurious about my portfolio website?\nI built it myself with Angular 19.\n\nYou can see the full code on GitHub:\nhttps://github.com/SimCommit/portfolio-website\n%c",
      "font-size:20px; font-weight:700;",
      "font-size:16px;",
      "font-weight:600;"
    );
  }
}
