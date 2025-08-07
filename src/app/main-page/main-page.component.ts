import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { HeroComponent } from "./hero/hero.component";
import { SectionNavComponent } from "./section-nav/section-nav.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { SkillsComponent } from "./skills/skills.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ReferencesComponent } from "./references/references.component";
import { ContactComponent } from "./contact/contact.component";
import { HeaderComponent } from "../shared/header/header.component";
import { MainPageScrollService } from "./main-page-scroll.service";
import { BreakpointObserverService } from "../breakpoint-observer.service";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-main-page",
  imports: [
    HeaderComponent,
    HeroComponent,
    SectionNavComponent,
    AboutMeComponent,
    SkillsComponent,
    PortfolioComponent,
    ReferencesComponent,
    ContactComponent,
    AsyncPipe,
  ],
  templateUrl: "./main-page.component.html",
  styleUrl: "./main-page.component.scss",
})
export class MainPageComponent {
  @ViewChildren("section", { read: ElementRef }) private sectionRefs!: QueryList<ElementRef>;

  isSpaceOnCooldown: boolean = false;

  isMobile: boolean = false;

  constructor(
    private mainPageScrollService: MainPageScrollService,
    public breakpointObserverService: BreakpointObserverService,
    private route: ActivatedRoute
  ) {}

  // #region Lifecycle
  ngOnInit(): void {
    // this.mainPageScrollService.isScrolling = true;
    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("keydown", this.onKeyDown, { passive: false });
    window.scrollTo({ top: 0, behavior: "auto" });
    this.initBreakpoint();
    // setTimeout(() => {
    //   this.mainPageScrollService.isScrolling = false;
    // }, 500);
  }

  initBreakpoint() {
    this.breakpointObserverService.isMobile$.subscribe((state) => (this.isMobile = state));
  }

  ngOnDestroy(): void {
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("keydown", this.onKeyDown);
  }

  ngAfterViewInit(): void {
    const elements = this.sectionRefs.map((ref) => ref.nativeElement);
    this.mainPageScrollService.setSectionRefs(elements);
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "hero") {
        setTimeout(() => {
          console.log("hero");
          this.mainPageScrollService.scrollToSection(0);
        }, 10);
      }

      if (fragment === "about-me") {
        setTimeout(() => {
          console.log("about-me");
          this.mainPageScrollService.scrollToSection(1);
        }, 10);
      }

      if (fragment === "skills") {
        setTimeout(() => {
          console.log("skills");
          this.mainPageScrollService.scrollToSection(2);
        }, 10);
      }

      if (fragment === "portfolio") {
        setTimeout(() => {
          console.log("portfolio");
          this.mainPageScrollService.scrollToSection(3);
        }, 10);
      }

      if (fragment === "references") {
        setTimeout(() => {
          console.log("references");
          this.mainPageScrollService.scrollToSection(4);
        }, 10);
      }

      if (fragment === "contact") {
        setTimeout(() => {
          console.log("contact");
          this.mainPageScrollService.scrollToSection(5);
        }, 10);
      }
    });
  }
  // #endregion

  private onWheel = (event: WheelEvent): void => {
    if (this.mainPageScrollService.isScrolling || this.isMobile) return;

    event.stopImmediatePropagation();

    if (event.deltaY > 0) {
      this.mainPageScrollService.nextSection();
    } else {
      this.mainPageScrollService.previousSection();
    }

    event.preventDefault();
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    if (this.mainPageScrollService.isScrolling || this.isMobile) return;

    event.stopImmediatePropagation();

    if (["ArrowDown", "PageDown"].includes(event.key) || event.key === " " || event.code === "Space") {
      if (this.preventSpaceScrolling(event)) return;

      this.mainPageScrollService.nextSection();

      event.preventDefault();
    }

    if (["ArrowUp", "PageUp"].includes(event.key)) {
      this.mainPageScrollService.previousSection();

      event.preventDefault();
    }
  };


  preventSpaceScrolling(event: KeyboardEvent): boolean {
    const target = event.target as HTMLElement;

    const isEditableElement = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);

    const isElementVisible = () => {
      const boundingBox = target.getBoundingClientRect();
      return boundingBox.bottom > 0 && boundingBox.top < window.innerHeight;
    };

    return isEditableElement && isElementVisible() && !this.mainPageScrollService.isScrolling;
  }
}
