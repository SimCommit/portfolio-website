import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MainPageScrollService {
  public sections: Element[] = [];

  currentSectionIndex: number = 0;

  isScrolling: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

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

  scrollToSection(sectionIndex: number): void {
    if (this.isScrolling) return;

    const element = this.sections[sectionIndex];
    // console.log(sectionIndex);

    if (element) {
      this.isScrolling = true;
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
      this.currentSectionIndex = sectionIndex;
    }
  }

  updateCurrentSection(newSectionIndex: number): void {
    // console.log("old index: " + this.currentSectionIndex, "new index: " + newSectionIndex);
    if (this.currentSectionIndex === newSectionIndex) return;

    this.currentSectionIndex = newSectionIndex;
    // console.log("final index: " + this.currentSectionIndex);
  }
}
