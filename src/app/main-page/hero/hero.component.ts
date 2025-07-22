import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MainPageStateService } from '../main-page-state.service';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  mainPageState = inject(MainPageStateService);

  @ViewChild('heroContent') heroContentRef!: ElementRef<HTMLElement>;
  @ViewChild('heroName') heroNameRef!: ElementRef<HTMLElement>;
  @ViewChild('heroGreeting') heroGreetingRef!: ElementRef<HTMLElement>;
  @ViewChild('heroPosition') heroPositionRef!: ElementRef<HTMLElement>;

  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    const containerElement = this.heroContentRef.nativeElement;
    const nameElement = this.heroNameRef.nativeElement;
    const greetingElement = this.heroGreetingRef.nativeElement;
    const positionElement = this.heroPositionRef.nativeElement;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;

        nameElement.style.fontSize = `${Math.min(width * 0.16, 140)}px`;
        greetingElement.style.fontSize = `${Math.min(width * 0.07, 61)}px`;
        positionElement.style.fontSize = `${Math.min(width * 0.07, 61)}px`;
      }
    });

    this.resizeObserver.observe(containerElement);
  }

  // updateDynamicSectionHeight(): void {
  //   const vw = window.innerWidth;
  //   const vh = window.innerHeight;

  //   let factor = 1;

  //   if (vw <= 768) {
  //     factor = 0.75;
  //   } else if (vw >= 1200) {
  //     factor = 1;
  //   } else {
  //     const t = (vw - 768) / (1200 - 786);
  //     factor = 0.75 + t * (1 - 0.75);
  //   }

  //   const dynamicHeight = vh * factor;
    

  // }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
