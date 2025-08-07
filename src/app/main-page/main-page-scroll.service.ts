import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BreakpointObserverService } from "../breakpoint-observer.service";

@Injectable({
  providedIn: "root",
})
export class MainPageScrollService {
  public sections: Element[] = [];

  currentSectionIndex: number = 0;

  isScrolling: boolean = false;

  isMobile: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private breakpointObserverService: BreakpointObserverService) {
    this.initBreakpoint();
  }

  initBreakpoint() {
    this.breakpointObserverService.isMobile$.subscribe(state => this.isMobile = state)
  }

  setSectionRefs(refs: Element[]) {
    this.sections = refs;
  }

  hasLightBackground(): boolean {
    return this.currentSectionIndex === 1 || this.currentSectionIndex === 3;
  }

  isCurrentSection(index: number): boolean {
    return this.currentSectionIndex === index;
  }

  lockScroll(): void {
    this.isScrolling = true;
  }

  unlockScroll(): void {
    this.isScrolling = false;
  }

  nextSection(): void {
    if (this.isScrolling) return;

    if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.currentSectionIndex);
      // console.log("nextSection", this.currentSectionIndex, this.sections[this.currentSectionIndex]);
    }
  }

  previousSection(): void {
    if (this.isScrolling) return;

    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.currentSectionIndex);
      // console.log("perviousSection", this.currentSectionIndex, this.sections[this.currentSectionIndex]);
    }
  }

  /**
   * Smoothly scrolls to a section based on its index in the section list and updates the URL fragment.
   *
   * - Ensures consistent reload behavior: reloading the page (e.g. via F5) will preserve the current section.
   * - Sets a scroll lock (`isScrolling`) to prevent simultaneous or repeated scroll actions.
   * - Resets the lock after a delay to allow further user-initiated navigation.
   * - Updates the browser's URL fragment using `replaceUrl: true` to avoid adding redundant history entries.
   *
   * @param {number} sectionIndex - Index of the section to scroll to within the `sections` list.
   */
  scrollToSection(sectionIndex: number): void {
    if (this.isScrolling) return;

    const element = this.sections[sectionIndex];
    const sectionId = element.id;

    if (element) {
      this.isScrolling = true;
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
      this.currentSectionIndex = sectionIndex;
    }

    if (sectionId) {
      this.router.navigate([], {
        fragment: sectionId,
        replaceUrl: true,
      });
    }
  }

  updateCurrentSection(newSectionIndex: number): void {
    // console.log("old index: " + this.currentSectionIndex, "new index: " + newSectionIndex);
    if (this.currentSectionIndex === newSectionIndex) return;

    this.currentSectionIndex = newSectionIndex;
    // console.log("final index: " + this.currentSectionIndex);
  }
}
