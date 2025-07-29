import { ElementRef, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SectionLayoutService {
  private sectionHeightSubject: BehaviorSubject<string> = new BehaviorSubject<string>("0px");
  // public sectionHeight$: Observable<string> = this.sectionHeightSubject.asObservable();
  public readonly sectionHeight$: Observable<string> = this.sectionHeightSubject.asObservable();


  private hasStarted = false;
  private BREAKPOINT_MOBILE: number = 800;

  constructor() {}

  startViewportObserver(): void {
    if (this.hasStarted) return;

    const updateSectionHeight = () => {
      const height = this.calculateSectionHeight(window.innerWidth, window.innerHeight);
      this.sectionHeightSubject.next(height);
    };

    updateSectionHeight(); // Initialer Wert
    window.addEventListener("resize", updateSectionHeight);

    this.hasStarted = true;
  }

  calculateSectionHeight(windowWidth: number, windowHeight: number): string {
    const sectionWidth = Math.min(windowWidth, 1600);
    const sectionHeight = sectionWidth * 0.6;
    const MAX_SECTION_ASPECT_RATIO = 1.5;
    const MIN_SECTION_HEIGHT = 440;

    if (windowWidth > this.BREAKPOINT_MOBILE) {
      const fitsAspectRatio = sectionWidth / windowHeight <= MAX_SECTION_ASPECT_RATIO;

      if (fitsAspectRatio) {
        return `${Math.max(sectionHeight, MIN_SECTION_HEIGHT)}px`;
      } else {
        return "clamp(640px, 100dvh, 1200px)";
      }
    } else {
      return "unset";
    }
  }
}
