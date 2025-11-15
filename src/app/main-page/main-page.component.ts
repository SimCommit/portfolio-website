import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import { HeroComponent } from "./hero/hero.component";
import { SectionNavComponent } from "./section-nav/section-nav.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { SkillsComponent } from "./skills/skills.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { ReferencesComponent } from "./references/references.component";
import { ContactComponent } from "./contact/contact.component";
import { HeaderComponent } from "../shared/header/header.component";
import { BreakpointObserverService } from "../breakpoint-observer.service";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MainPageScrollService } from "./services/main-page-scroll.service";

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

  SCROLL_DOWN_THRESHOLD_SINGLE: number = 80;
  SCROLL_UP_THRESHOLD_SINGLE: number = -80;

  SCROLL_DOWN_THRESHOLD_SUM: number = 80;
  SCROLL_UP_THRESHOLD_SUM: number = -80;

  latestWheelEvent: number = 0;
  latestWheelScroll: number = 0;
  currentDeltaYSum: number = 0;
  wheelEventCount: number = 0;

  eventsOfLast120Ms: { deltaY: number; time: number }[] = [];

  timeSlotClosed: boolean = false;

  yOnTouchStart: number = 0;

  // MEHR STRUKTUR
  newEventTime: number = 1000;
  previousEventTime: number = 0;
  onCooldown: boolean = false;
  timeSlotStart: number = 0;

  WINDOW_MS: number = 120;
  COOLDOWN_MS: number = 300;

  constructor(
    private mainPageScrollService: MainPageScrollService,
    public breakpointObserverService: BreakpointObserverService,
    private route: ActivatedRoute
  ) {}

  // #region Lifecycle
  ngOnInit(): void {
    window.addEventListener("wheel", this.onWheelLogDeltaY, { passive: false });
    window.addEventListener("wheel", this.onWheelBETTER, { passive: false });
    window.addEventListener("keydown", this.onKeyDown, { passive: false });
    window.addEventListener("touchstart", this.onTouchStart);
    window.addEventListener("touchend", this.onTouchEnd);

    window.scrollTo({ top: 0, behavior: "auto" });
    this.initBreakpoint();
  }

  ngOnDestroy(): void {
    window.removeEventListener("wheel", this.onWheelLogDeltaY);
    window.removeEventListener("wheel", this.onWheelBETTER);
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchend", this.onTouchEnd);
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
  // private onWheelBETTER = (event: WheelEvent): void => {
  //   this.newEventTime = performance.now();

  //   if (this.mainPageScrollService.isScrolling || this.isMobile) return;

  //   event.stopImmediatePropagation();

  //   if (this.previousEventTime + 250 < this.newEventTime) {
  //     this.eventsOfLast120Ms = [];
  //     // this.timeSlotStart = performance.now();
  //     this.onCooldown = false;
  //     // vollständig frische Geste erkennen?
  //   }

  //   let sum: number = 0;

  //   if (this.onCooldown) return;

  //   this.previousEventTime = this.newEventTime;

  //   this.eventsOfLast120Ms.push({ deltaY: event.deltaY, time: performance.now() });

  //   this.eventsOfLast120Ms = this.eventsOfLast120Ms.filter((e) => {
  //     return e.time + 120 > performance.now();
  //   });

  //   this.eventsOfLast120Ms.forEach((e) => {
  //     sum = sum + e.deltaY;
  //   });

  //   if (event.deltaY > this.SCROLL_DOWN_THRESHOLD_SINGLE || sum > this.SCROLL_DOWN_THRESHOLD_SUM) {
  //     this.mainPageScrollService.nextSection();
  //     this.onCooldown = true;
  //     setTimeout(() => {
  //       this.onCooldown = false;
  //     }, 300);
  //     // Zeitfenster beenden
  //   }

  //   if (event.deltaY < this.SCROLL_UP_THRESHOLD_SINGLE || sum < this.SCROLL_UP_THRESHOLD_SUM) {
  //     this.mainPageScrollService.previousSection();
  //     this.onCooldown = true;
  //     setTimeout(() => {
  //       this.onCooldown = false;
  //     }, 300);
  //   }

  //   event.preventDefault();
  // };

  private onWheelBETTER = (event: WheelEvent): void => {
    if (this.mainPageScrollService.isScrolling || this.isMobile) return;
    
        event.stopImmediatePropagation();

    if (this.onCooldown) {
      // Wir wollen jeglichen Nachlauf blocken
      event.preventDefault();
      return;
    }

    const now: number = performance.now();

    this.eventsOfLast120Ms.push({ deltaY: event.deltaY, time: now });

    this.eventsOfLast120Ms = this.eventsOfLast120Ms.filter((e) => {
      return e.time + this.WINDOW_MS > now;
    });

    let sum: number = 0;
    for (const e of this.eventsOfLast120Ms) {
      sum += e.deltaY;
    }

    const triggerDown: boolean =
      event.deltaY > this.SCROLL_DOWN_THRESHOLD_SINGLE || sum > this.SCROLL_DOWN_THRESHOLD_SUM;

    const triggerUp: boolean = event.deltaY < this.SCROLL_UP_THRESHOLD_SINGLE || sum < this.SCROLL_UP_THRESHOLD_SUM;

    if (triggerDown) {
      this.triggerScrollDown();
      event.preventDefault();
      return;
    }

    if (triggerUp) {
      this.triggerScrollUp();
      event.preventDefault();
      return;
    }

    event.preventDefault();
  };

  private triggerScrollDown(): void {
    this.mainPageScrollService.nextSection();
    this.startCooldown();
  }

  private triggerScrollUp(): void {
    this.mainPageScrollService.previousSection();
    this.startCooldown();
  }

  private startCooldown(): void {
    this.onCooldown = true;
    this.eventsOfLast120Ms = [];

    setTimeout(() => {
      this.onCooldown = false;
    }, this.COOLDOWN_MS);
  }

  // shouldScrollDown(deltaY: number) {
  //   return this.currentDeltaYSum > this.SCROLL_DOWN_THRESHOLD_SUM || deltaY > this.SCROLL_DOWN_THRESHOLD_SINGLE;
  // }

  // shouldScrollUp(deltaY: number) {
  //   return this.currentDeltaYSum < this.SCROLL_UP_THRESHOLD_SUM || deltaY < this.SCROLL_UP_THRESHOLD_SINGLE;
  // }

  // nur für debugging
  private onWheelLogDeltaY = (event: WheelEvent): void => {
    console.log("deltaY: ", event.deltaY); //lösch mich
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

  private onTouchStart = (event: TouchEvent): void => {
    if (this.mainPageScrollService.isScrolling || this.isMobile) return;
    event.stopImmediatePropagation();

    this.yOnTouchStart = event.touches[0].clientY;
  };

  private onTouchEnd = (event: TouchEvent): void => {
    if (this.mainPageScrollService.isScrolling || this.isMobile) return;
    event.stopImmediatePropagation();

    const yOnTouchEnd = event.changedTouches[0].clientY;
    const swipeThreshold = window.innerHeight * 0.02;

    if (this.yOnTouchStart > yOnTouchEnd && Math.abs(this.yOnTouchStart - yOnTouchEnd) > swipeThreshold) {
      this.mainPageScrollService.nextSection();
    }

    if (this.yOnTouchStart < yOnTouchEnd && Math.abs(this.yOnTouchStart - yOnTouchEnd) > swipeThreshold) {
      this.mainPageScrollService.previousSection();
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
