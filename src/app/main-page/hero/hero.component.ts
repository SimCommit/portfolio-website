import { Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MainPageScrollService } from "../main-page-scroll.service";
import { SectionLayoutService } from "../services/section-layout.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-hero",
  imports: [TranslateModule],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.scss",
})
export class HeroComponent {
  @ViewChild("heroSection") heroSectionRef!: ElementRef<HTMLElement>;
  @ViewChild("heroContent") heroContentRef!: ElementRef<HTMLElement>;
  @ViewChild("heroText") heroTextRef!: ElementRef<HTMLElement>;
  @ViewChild("heroHeadline") heroHeadlineRef!: ElementRef<HTMLElement>;
  @ViewChild("heroGreeting") heroGreetingRef!: ElementRef<HTMLElement>;
  @ViewChild("heroPosition") heroPositionRef!: ElementRef<HTMLElement>;
  @ViewChild("heroCogwheel") heroCogwheelRef!: ElementRef<HTMLElement>;

  private headlineObserver!: ResizeObserver;
  private offsetObserver!: ResizeObserver;
  private subscription!: Subscription;

  private BREAKPOINT_MOBILE: number = 800;
  private MAX_HEADLINE_SIZE: number = 140;
  private MAX_TAGLINE_SIZE: number = 61;
  private MAX_COGWHEEL_SIZE: number = 148;

  constructor(
    public mainPageScrollService: MainPageScrollService,
    private sectionLayoutService: SectionLayoutService
  ) {}

  // #region Lifecycle
  ngAfterViewInit(): void {
    this.sectionLayoutService.startViewportObserver();
    this.initSectionHeightObserver();
    this.initHeadlineScaleObserver();
    this.initSectionOffsetObserver();
  }

  ngOnDestroy(): void {
    this.headlineObserver?.disconnect();
    this.offsetObserver?.disconnect();
    this.subscription?.unsubscribe();
  }
  // #endregion

  private initHeadlineScaleObserver(): void {
    const contentEl = this.heroContentRef.nativeElement;

    this.headlineObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this.handleHeadlineResize(entries);
    });

    this.headlineObserver.observe(contentEl);
  }

  private handleHeadlineResize = (entries: ResizeObserverEntry[]): void => {
    const headlineEl = this.heroHeadlineRef.nativeElement;
    const greetingTaglineEl = this.heroGreetingRef.nativeElement;
    const positionTaglineEl = this.heroPositionRef.nativeElement;
    const cogwheelEl = this.heroCogwheelRef.nativeElement;

    for (const entry of entries as ResizeObserverEntry[]) {
      const containerWidth = entry.contentRect.width;
      headlineEl.style.fontSize = `${Math.min(containerWidth * 0.16, this.MAX_HEADLINE_SIZE)}px`;
      greetingTaglineEl.style.fontSize = `${Math.min(containerWidth * 0.07, this.MAX_TAGLINE_SIZE)}px`;
      positionTaglineEl.style.fontSize = `${Math.min(containerWidth * 0.07, this.MAX_TAGLINE_SIZE)}px`;
      cogwheelEl.style.width = `${Math.min(containerWidth * 0.3, this.MAX_COGWHEEL_SIZE)}px`;
      cogwheelEl.style.height = `${Math.min(containerWidth * 0.3, this.MAX_COGWHEEL_SIZE)}px`;
    }
  };

  private initSectionOffsetObserver() {
    const sectionEl = this.heroSectionRef.nativeElement;

    this.offsetObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this.handleSectionOffsetResize(entries);
    });

    this.offsetObserver.observe(sectionEl);
  }

  private handleSectionOffsetResize = (entries: ResizeObserverEntry[]): void => {
    const cogwheelEl = this.heroCogwheelRef.nativeElement;
    const textEl = this.heroTextRef.nativeElement;

    for (const entry of entries as ResizeObserverEntry[]) {
      const windowWidth = window.innerWidth;
      const sectionHeight = entry.contentRect.height;
      const multiplierText = sectionHeight / 400;
      const multiplier = sectionHeight / 600;

      if (windowWidth > this.BREAKPOINT_MOBILE) {
        textEl.style.marginTop = `${sectionHeight * 0.05 * multiplierText}px`;
        cogwheelEl.style.bottom = `${sectionHeight * 0.05 * multiplier}px`;
      } else {
        textEl.style.marginTop = "clamp(1.6rem, 3.333vw + 0.533rem, 3.2rem)";
        cogwheelEl.style.bottom = "clamp(1.6rem, 7.5vw - 0.8rem, 11.2rem)";
      }
    }
  };

  private initSectionHeightObserver() {
    this.subscription = this.sectionLayoutService.sectionHeight$.subscribe((height) => {
      this.heroSectionRef.nativeElement.style.height = height;
    });
  }
}
