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
  isMobile: boolean = false;
  yOnTouchStart: number = 0;

  SCROLL_DOWN_THRESHOLD_SINGLE: number = 80;
  SCROLL_UP_THRESHOLD_SINGLE: number = -80;
  SCROLL_DOWN_THRESHOLD_SUM: number = 80;
  SCROLL_UP_THRESHOLD_SUM: number = -80;

  eventsOfLast120Ms: { deltaY: number; time: number }[] = [];
  eventsOfLast2000Ms: { deltaY: number; time: number }[] = [];
  onCooldown: boolean = false;
  newWheelEventStartTime: number = 0;

  SMALL_WINDOW_MS: number = 120;
  LARGE_WINDOW_MS: number = 2000;
  COOLDOWN_MS: number = 300;

  constructor(
    private mainPageScrollService: MainPageScrollService,
    public breakpointObserverService: BreakpointObserverService,
    private route: ActivatedRoute
  ) {}

  // #region Lifecycle
  ngOnInit(): void {
    // window.addEventListener("wheel", this.onWheelLogDeltaY, { passive: false });
    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("keydown", this.onKeyDown, { passive: false });
    window.addEventListener("touchstart", this.onTouchStart);
    window.addEventListener("touchend", this.onTouchEnd);

    window.scrollTo({ top: 0, behavior: "auto" });
    this.initBreakpoint();
  }

  ngOnDestroy(): void {
    // window.removeEventListener("wheel", this.onWheelLogDeltaY);
    window.removeEventListener("wheel", this.onWheel);
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
  private onWheel = (event: WheelEvent): void => {
    this.newWheelEventStartTime = performance.now();
    this.eventsOfLast2000Ms.push({ deltaY: event.deltaY, time: this.newWheelEventStartTime });
    if (this.mainPageScrollService.isScrolling || this.isMobile) return;

    event.stopImmediatePropagation();

    // STOP when on scroll cooldown
    if (this.onCooldown) {
      event.preventDefault();
      return;
    }

    // push Event into arrays
    this.eventsOfLast120Ms.push({ deltaY: event.deltaY, time: this.newWheelEventStartTime });

    // remove old events from arrays
    this.eventsOfLast120Ms = this.eventsOfLast120Ms.filter((e) => {
      return e.time + this.SMALL_WINDOW_MS > this.newWheelEventStartTime;
    });
    this.eventsOfLast2000Ms = this.eventsOfLast2000Ms.filter((e) => {
      return e.time + this.LARGE_WINDOW_MS > this.newWheelEventStartTime;
    });

    // calculate deltaY sum of events younger than 120ms
    let sum: number = 0;
    let sumDifferenceDown: number = Infinity;
    let sumDifferenceUp: number = -Infinity;

    sum = this.getDeltaYSumOfArray(this.eventsOfLast120Ms);

    // Compare new Events with older
    if (this.eventsOfLast2000Ms.length > 10) {
      let arrayOf5NewestEvents = this.eventsOfLast2000Ms.slice(-5);
      let arrayOf5OlderEvents = this.eventsOfLast2000Ms.slice(-10, -5);

      let sumNew = this.getDeltaYSumOfArray(arrayOf5NewestEvents);
      let sumOld = this.getDeltaYSumOfArray(arrayOf5OlderEvents);

      sumDifferenceDown = sumNew - sumOld;
      sumDifferenceUp = sumOld - sumNew;
    }

    // Scroll conditions
    const triggerDown: boolean =
      event.deltaY > this.SCROLL_DOWN_THRESHOLD_SINGLE ||
      (sum > this.SCROLL_DOWN_THRESHOLD_SUM && sumDifferenceDown > 15);
    const triggerUp: boolean =
      event.deltaY < this.SCROLL_UP_THRESHOLD_SINGLE || (sum < this.SCROLL_UP_THRESHOLD_SUM && sumDifferenceUp > 15);

    // console.log("sum =", sum, "sumDiffDown =", sumDifferenceDown, "sumDiffUp =", sumDifferenceUp);

    // Scroll functions
    if (triggerDown) {
      // this.logTrigger(
      //   event.deltaY > this.SCROLL_DOWN_THRESHOLD_SINGLE,
      //   sum > this.SCROLL_DOWN_THRESHOLD_SUM && sumDifferenceDown > 15
      // );
      this.triggerScrollDown();
      this.startCooldown();
      event.preventDefault();
      return;
    }
    if (triggerUp) {
      // this.logTrigger(
      //   event.deltaY < this.SCROLL_UP_THRESHOLD_SINGLE,
      //   sum < this.SCROLL_UP_THRESHOLD_SUM && sumDifferenceUp > 15
      // );
      this.triggerScrollUp();
      this.startCooldown();
      event.preventDefault();
      return;
    }

    // event.preventDefault(); ?
  };

  getDeltaYSumOfArray(array: { deltaY: number; time: number }[]): number {
    let sum: number = 0;
    for (const e of array) {
      sum += e.deltaY;
    }
    return sum;
  }

  logTrigger(condition1: boolean, condition2: boolean) {
    if (condition1) {
      console.log("trigger: SINGLE");
    } else if (condition2) {
      console.log("trigger: SUM");
    }
  }

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

  // nur für debugging
  // private onWheelLogDeltaY = (event: WheelEvent): void => {
  //   console.log("deltaY: ", event.deltaY);
  // };

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