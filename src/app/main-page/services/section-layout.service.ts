import { ElementRef, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SectionLayoutService {
  private sectionHeightSubject: BehaviorSubject<string> = new BehaviorSubject<string>("0px");
  private sectionStateSubject: BehaviorSubject<"regular" | "tall" | "mobile"> = new BehaviorSubject<
    "regular" | "tall" | "mobile"
  >("regular");

  public readonly sectionHeight$: Observable<string> = this.sectionHeightSubject.asObservable();
  public sectionState$: Observable<"regular" | "tall" | "mobile"> = this.sectionStateSubject.asObservable();

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
        this.sectionStateSubject.next("tall");
        return `${Math.max(sectionHeight, MIN_SECTION_HEIGHT)}px`;
      } else {
        this.sectionStateSubject.next("regular");
        return "clamp(640px, 100dvh, 1200px)";
      }
    } else {
      this.sectionStateSubject.next("mobile");
      return "unset";
    }
  }
}
