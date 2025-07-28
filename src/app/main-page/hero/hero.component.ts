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

  constructor(public mainPageScrollService: MainPageScrollService) {}

  ngAfterViewInit(): void {
    this.initHeadlineScaleObserver();
    this.initSectionOffsetObserver();
    window.addEventListener("resize", this.updateSectionHeight);
    this.updateSectionHeight();
  }

  initHeadlineScaleObserver(): void {
    const contentEl = this.heroContentRef.nativeElement;
    const headlineEl = this.heroHeadlineRef.nativeElement;
    const greetingTaglineEl = this.heroGreetingRef.nativeElement;
    const positionTaglineEl = this.heroPositionRef.nativeElement;
    const cogwheelEl = this.heroCogwheelRef.nativeElement;

    const MAX_HEADLINE_SIZE: number = 140;
    const MAX_TAGLINE_SIZE: number = 61;
    const MAX_COGWHEEL_SIZE: number = 148;
    // const MIN_COGWHEEL_SIZE: number = 80;
    // const MAX_COGWHEEL_BOTTOM: number = 112;

    this.headlineObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries as ResizeObserverEntry[]) {
        const containerWidth = entry.contentRect.width;
        // const containerHeight = entry.contentRect.height;

        headlineEl.style.fontSize = `${Math.min(containerWidth * 0.16, MAX_HEADLINE_SIZE)}px`;
        greetingTaglineEl.style.fontSize = `${Math.min(containerWidth * 0.07, MAX_TAGLINE_SIZE)}px`;
        positionTaglineEl.style.fontSize = `${Math.min(containerWidth * 0.07, MAX_TAGLINE_SIZE)}px`;
        cogwheelEl.style.width = `${Math.min(containerWidth * 0.3, MAX_COGWHEEL_SIZE)}px`;
        cogwheelEl.style.height = `${Math.min(containerWidth * 0.3, MAX_COGWHEEL_SIZE)}px`;
      }
    });

    this.headlineObserver.observe(contentEl);
  }

  initSectionOffsetObserver() {
    const sectionEl = this.heroSectionRef.nativeElement;
    const cogwheelEl = this.heroCogwheelRef.nativeElement;
    const textEl = this.heroTextRef.nativeElement;

    this.offsetObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries as ResizeObserverEntry[]) {
        const windowWidth = window.innerWidth;
        const sectionHeight = entry.contentRect.height;
        const multiplier = sectionHeight / 600;
        console.log(sectionHeight);
        console.log(multiplier);

        if (windowWidth > 800) {
          textEl.style.marginTop = `${sectionHeight * 0.07 * multiplier}px`;
          cogwheelEl.style.bottom = `${sectionHeight * 0.05 * multiplier}px`;
        } else {
          textEl.style.marginTop = `${40}px`;
          cogwheelEl.style.bottom = `${40}px`;
        }
      }
    });

    this.offsetObserver.observe(sectionEl);
  }

  updateSectionHeight = (): void => {
    const sectionEl = this.heroSectionRef.nativeElement;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const sectionWidth = Math.min(windowWidth, 1600);
    const sectionHeight = sectionWidth * 0.6;
    const MAX_SECTION_ASPECT_RATIO: number = 1.5;
    const BREAKPOINT_MOBILE: number = 800;
    const MIN_SECTION_HEIGHT: number = 440;

    if (sectionWidth / windowHeight <= MAX_SECTION_ASPECT_RATIO && windowWidth >= BREAKPOINT_MOBILE) {
      sectionEl.style.height = `${Math.max(sectionHeight, MIN_SECTION_HEIGHT)}px`;
    } else if (windowWidth < BREAKPOINT_MOBILE) {
      sectionEl.style.height = "unset";
    } else {
      sectionEl.style.height = `clamp(640px, 100dvh, 1200px)`;
    }
  };

  ngOnDestroy(): void {
    this.headlineObserver?.disconnect();
    this.offsetObserver?.disconnect();
    window.removeEventListener("resize", this.updateSectionHeight);
  }
}
