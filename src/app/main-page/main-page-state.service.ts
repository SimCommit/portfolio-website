import { DOCUMENT } from '@angular/common';
import { ElementRef, HostListener, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainPageStateService {
  // currentSection: number = 6;

  // currentPage: "main-page" | "legal-notice" | "privacy-policy" = "main-page";

  anchors: string[] = [
    'hero',
    'about-me',
    'skills',
    'portfolio',
    'references',
    'contact',
  ];

  currentBackground: string[] = [
    '#679AAC',
    '#F8F7E5',
    '#1D1D1D',
    '#F8F7E5',
    '#679AAC',
    '#1D1D1D',
  ];

  currentLanguage: 'de' | 'en' = 'en';

  hideMenu: boolean = true;

  burgerMenuIsOpen: boolean = false;

  mobileView: boolean = false;

  isScrolling: boolean = false;

  private sections: Element[] = [];

  currentSectionIndex: number = 0;
  lastScrolled = '';
  sections1 = [];
  activeSection: any; // :((((((((((((((((((((((((((((((

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setSectionRefs(refs: Element[]) {
    this.sections = refs;
  }

  prevent = (e: Event) => e.preventDefault();
  keyBlock = (e: KeyboardEvent) => {
    if (
      ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown'].includes(e.key)
    ) {
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true; // for really old browsers
    }
  };

  nextSection() {
    if (this.isScrolling) return;

    if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.anchors[this.currentSectionIndex]);
      console.log(
        'nextSection',
        this.currentSectionIndex,
        this.anchors[this.currentSectionIndex]
      );
    }
  }

  previousSection() {
    if (this.isScrolling) return;

    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.anchors[this.currentSectionIndex]);
      console.log(
        'perviousSection',
        this.currentSectionIndex,
        this.anchors[this.currentSectionIndex]
      );
    }
  }

  scrollToSection(sectionId: string) {
    if (this.isScrolling) return;
    const element = document.getElementById(sectionId);
    const index = this.anchors.indexOf(sectionId);

    if (element) {
      this.isScrolling = true;
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
    }
  }

}
