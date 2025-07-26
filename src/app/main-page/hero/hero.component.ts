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
  @ViewChild("heroName") heroNameRef!: ElementRef<HTMLElement>;
  @ViewChild("heroGreeting") heroGreetingRef!: ElementRef<HTMLElement>;
  @ViewChild("heroPosition") heroPositionRef!: ElementRef<HTMLElement>;

  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    const sectionElement = this.heroSectionRef.nativeElement;
    const containerElement = this.heroContentRef.nativeElement;
    const nameElement = this.heroNameRef.nativeElement;
    const greetingElement = this.heroGreetingRef.nativeElement;
    const positionElement = this.heroPositionRef.nativeElement;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const sectionWidth = Math.min(windowWidth, 1600);

        nameElement.style.fontSize = `${Math.min(containerWidth * 0.16, 140)}px`;
        console.log(Math.min(containerWidth * 0.16, 140));

        greetingElement.style.fontSize = `${Math.min(containerWidth * 0.07, 61)}px`;
        positionElement.style.fontSize = `${Math.min(containerWidth * 0.07, 61)}px`;

        if (sectionWidth / windowHeight <= 1.4 && windowWidth >= 768) {
          sectionElement.style.height = `${sectionWidth * 0.6}px`;
        } else {
          sectionElement.style.height = `100dvh`;
        }
      }
    });

    this.resizeObserver.observe(containerElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
