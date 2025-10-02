import { Component, ElementRef, NgZone, ViewChild } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenuOverlayComponent } from "./overlays/menu-overlay/menu-overlay.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { marker as _ } from "@colsen1991/ngx-translate-extract-marker";
import { filter } from "rxjs";
import { PageStateService } from "./page-state.service";
import { EmailFeedbackOverlayComponent } from "./overlays/email-feedback-overlay/email-feedback-overlay.component";
import { MainPageScrollService } from "./main-page/services/main-page-scroll.service";
import { CustomCursorPositioningService } from "./shared/services/custom-cursor-positioning.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, MenuOverlayComponent, CommonModule, TranslateModule, EmailFeedbackOverlayComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title: string = "portfolio-website";

  body: HTMLElement = document.body;

  @ViewChild("customCursor", { static: false, read: ElementRef }) customCursorRef!: ElementRef<HTMLDivElement>;

  userLang = navigator.language;

  constructor(
    private translate: TranslateService,
    private router: Router,
    public pageStateService: PageStateService,
    private mainPageScrollService: MainPageScrollService,
    public customCursorPositioningService: CustomCursorPositioningService
  ) {
    this.translate.addLangs(["de", "en"]);
    this.translate.setDefaultLang("en");
    this.translate.use(this.userLang.slice(0, 2));
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

  ngAfterViewInit(): void {
    // this.customCursorExecuter();
    this.customCursorRAFMovement();
  }

  customCursorRAFMovement() {
    this.customCursorRef.nativeElement.style.top = this.customCursorPositioningService.mouseY + "px";
    this.customCursorRef.nativeElement.style.left = this.customCursorPositioningService.mouseX + "px";

    requestAnimationFrame(() => this.customCursorRAFMovement());
  }

  // customCursorExecuter(state: "default" | "scroll") {
  //   if ((state = "scroll")) {
  //     this.customCursorRef.nativeElement.classList.add("cursor-scroll");
  //   } else {
  //     this.customCursorRef.nativeElement.classList.remove("cursor-scroll");
  //   }
  // }

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
