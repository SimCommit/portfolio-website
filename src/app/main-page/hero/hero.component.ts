import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MainPageScrollService } from "../main-page-scroll.service";

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
  private sectionResizeObserver!: ResizeObserver;
  private BREAKPOINT_MOBILE: number = 800;
  private MAX_HEADLINE_SIZE: number = 140;
  private MAX_TAGLINE_SIZE: number = 61;
  private MAX_COGWHEEL_SIZE: number = 148;

  constructor(public mainPageScrollService: MainPageScrollService) {}

  ngAfterViewInit(): void {
    this.initSectionHeightObserver();
    this.initHeadlineScaleObserver();
    this.initSectionOffsetObserver();
  }

  initHeadlineScaleObserver(): void {
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

  initSectionOffsetObserver() {
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
        textEl.style.marginTop = "32px";
        cogwheelEl.style.bottom = "clamp(1.6rem, 7.5vw - 0.8rem, 11.2rem)";
      }
    }
  };

  initSectionHeightObserver() {
    this.sectionResizeObserver = new ResizeObserver(() => {
      this.updateSectionHeight();
    });
    this.sectionResizeObserver.observe(this.heroSectionRef.nativeElement);

    window.addEventListener("resize", this.updateSectionHeight);
  }

  private updateSectionHeight = (): void => {
    const sectionEl = this.heroSectionRef.nativeElement;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const sectionWidth = Math.min(windowWidth, 1600);
    const sectionHeight = sectionWidth * 0.6;
    const MAX_SECTION_ASPECT_RATIO: number = 1.5;
    const MIN_SECTION_HEIGHT: number = 440;

    if (windowWidth > this.BREAKPOINT_MOBILE) {
      const fitsAspectRatio = sectionWidth / windowHeight <= MAX_SECTION_ASPECT_RATIO;

      if (fitsAspectRatio) {
        sectionEl.style.height = `${Math.max(sectionHeight, MIN_SECTION_HEIGHT)}px`;
      } else {
        sectionEl.style.height = "clamp(640px, 100dvh, 1200px)";
      }
    } else {
      sectionEl.style.height = "unset";
    }
  };

  ngOnDestroy(): void {
    this.headlineObserver?.disconnect();
    this.offsetObserver?.disconnect();
    this.sectionResizeObserver?.disconnect();
    window.removeEventListener("resize", this.updateSectionHeight);
  }
}
