import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { MainPageStateService } from "../main-page-state.service";

@Component({
  selector: "app-hero",
  imports: [TranslateModule],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.scss",
})
export class HeroComponent {
  mainPageState = inject(MainPageStateService);

  @ViewChild("heroSection") heroSectionRef!: ElementRef<HTMLElement>;
  @ViewChild("heroContent") heroContentRef!: ElementRef<HTMLElement>;
  @ViewChild("heroHeadline") heroHeadlineRef!: ElementRef<HTMLElement>;
  @ViewChild("heroGreeting") heroGreetingRef!: ElementRef<HTMLElement>;
  @ViewChild("heroPosition") heroPositionRef!: ElementRef<HTMLElement>;

  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    this.initResizeObserver();
    window.addEventListener("resize", this.updateSectionHeight);
    this.updateSectionHeight();
  }

  initResizeObserver(): void {
    const contentEl = this.heroContentRef.nativeElement;
    const headlineEl = this.heroHeadlineRef.nativeElement;
    const greetingTaglineEl = this.heroGreetingRef.nativeElement;
    const positionTaglineEl = this.heroPositionRef.nativeElement;
    const MAX_HEADLINE_SIZE: number = 140;
    const MAX_TAGLINE_SIZE: number = 61;

    this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries as ResizeObserverEntry[]) {
        const containerWidth = entry.contentRect.width;
        headlineEl.style.fontSize = `${Math.min(containerWidth * 0.16, MAX_HEADLINE_SIZE)}px`;
        greetingTaglineEl.style.fontSize = `${Math.min(containerWidth * 0.07, MAX_TAGLINE_SIZE)}px`;
        positionTaglineEl.style.fontSize = `${Math.min(containerWidth * 0.07, MAX_TAGLINE_SIZE)}px`;
      }
    });

    this.resizeObserver.observe(contentEl);
  }

  updateSectionHeight = (): void => {
    const sectionElement = this.heroSectionRef.nativeElement;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const sectionWidth = Math.min(windowWidth, 1600);
    const MAX_SECTION_ASPECT_RATIO: number = 1.5;
    const BREAKPOINT_MOBILE: number = 800;
    const MIN_SECTION_HEIGHT: number = 440;

    if (sectionWidth / windowHeight <= MAX_SECTION_ASPECT_RATIO && windowWidth >= BREAKPOINT_MOBILE) {
      sectionElement.style.height = `${Math.max(sectionWidth * 0.6, MIN_SECTION_HEIGHT)}px`;
    } else if (windowWidth < BREAKPOINT_MOBILE) {
      sectionElement.style.height = "unset";
    } else {
      sectionElement.style.height = `clamp(640px, 100dvh, 1200px)`;
    }
  };

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener("resize", this.updateSectionHeight);
  }
}
