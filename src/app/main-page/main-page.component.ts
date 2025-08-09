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
  readonly sectionIds: string[] = ["hero", "about-me", "skills", "portfolio", "references", "contact"];
  isSpaceOnCooldown: boolean = false;
  isMobile: boolean = false;

  constructor(
    private mainPageScrollService: MainPageScrollService,
    public breakpointObserverService: BreakpointObserverService,
    private route: ActivatedRoute
  ) {}

  // #region Lifecycle
  ngOnInit(): void {
    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("keydown", this.onKeyDown, { passive: false });
    window.scrollTo({ top: 0, behavior: "auto" });
    this.initBreakpoint();
  }

  ngOnDestroy(): void {
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("keydown", this.onKeyDown);
  }

  ngAfterViewInit(): void {
    const elements = this.sectionRefs.map((ref) => ref.nativeElement);
    this.mainPageScrollService.setSectionRefs(elements);
    this.route.fragment.subscribe((fragment) => {
      this.handleFragmentSectionScroll(fragment);
    });
  }
  // #endregion

  // #region Event Handlers
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
  // #endregion

  // #region Helpers
  private initBreakpoint() {
    this.breakpointObserverService.isMobile$.subscribe((state) => (this.isMobile = state));
  }

  private preventSpaceScrolling(event: KeyboardEvent): boolean {
    const target = event.target as HTMLElement;
    const isEditableElement = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
    const isElementVisible = () => {
      const boundingBox = target.getBoundingClientRect();
      return boundingBox.bottom > 0 && boundingBox.top < window.innerHeight;
    };
    return isEditableElement && isElementVisible() && !this.mainPageScrollService.isScrolling;
  }

  // Helper for fragment routing
  private handleFragmentSectionScroll(fragment: string | null): void {
    if (fragment === null) return;
    const sectionIndex: number = this.sectionIds.indexOf(fragment);

    if (sectionIndex >= 0) {
      setTimeout(() => {
        this.mainPageScrollService.scrollToSection(sectionIndex);
      }, 10);
    }
  }
  // #endregion
}
