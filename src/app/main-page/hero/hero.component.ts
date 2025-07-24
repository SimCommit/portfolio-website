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
        console.log(width);
        console.log('Resize on:', containerElement.tagName);


        nameElement.style.fontSize = `${Math.min(width * 0.16, 140)}px`;
        console.log(Math.min(width * 0.16, 140));

        greetingElement.style.fontSize = `${Math.min(width * 0.07, 61)}px`;
        positionElement.style.fontSize = `${Math.min(width * 0.07, 61)}px`;
      }
    });

    this.resizeObserver.observe(containerElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
