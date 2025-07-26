import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MainPageScrollService {
  anchors: string[] = ["hero", "about-me", "skills", "portfolio", "references", "contact"];

  private sections: Element[] = [];

  currentSectionIndex: number = 0;

  isScrolling: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setSectionRefs(refs: Element[]) {
    this.sections = refs;
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
      this.scrollToSection(this.anchors[this.currentSectionIndex]);
      console.log("nextSection", this.currentSectionIndex, this.anchors[this.currentSectionIndex]);
    }
  }

  previousSection(): void {
    if (this.isScrolling) return;

    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.anchors[this.currentSectionIndex]);
      console.log("perviousSection", this.currentSectionIndex, this.anchors[this.currentSectionIndex]);
    }
  }

  scrollToSection(sectionId: string): void {
    if (this.isScrolling) return;
    console.log(sectionId);

    const element = document.getElementById(sectionId);
    // const index = this.anchors.indexOf(sectionId);

    if (element) {
      this.isScrolling = true;
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
    }
  }

  updateCurrentSection(newSectionIndex: number): void {
    console.log("old index: " + this.currentSectionIndex, "new index: " + newSectionIndex);
    if (this.currentSectionIndex === newSectionIndex) return;

    this.currentSectionIndex = newSectionIndex;
    console.log("final index: " + this.currentSectionIndex);
  }
}
