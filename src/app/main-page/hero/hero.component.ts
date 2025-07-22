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

        nameElement.style.fontSize = `${width * 0.16}px`;
        greetingElement.style.fontSize = `${width * 0.07}px`;
        positionElement.style.fontSize = `${width * 0.07}px`;

        console.log('[HeroContent] Width: ', width);
      }
    });

    this.resizeObserver.observe(containerElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
