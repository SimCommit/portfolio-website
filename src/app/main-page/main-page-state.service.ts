import { DOCUMENT } from '@angular/common';
import { ElementRef, HostListener, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainPageStateService {
  currentSection: number = 6;

  // currentPage: "main-page" | "legal-notice" | "privacy-policy" = "main-page";

  anchors: string[] = [
    '#',
    '#hero',
    '#about-me',
    '#skills',
    '#portfolio',
    '#references',
    '#contact',
  ];

  currentBackground: string[] = [
    '',
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

  private sections: Element[] = [];

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
    }
  };

  @HostListener("window:wheel", )

  disableScrolling(index: number) {
    const target = this.sections[index];
    if (!target) return;

    // Blockiere Scroll-Eingaben
    window.addEventListener('wheel', this.prevent, { passive: false });
    window.addEventListener('touchmove', this.prevent, { passive: false });
    window.addEventListener('keydown', this.keyBlock, false);

    // Überwache, wann Ziel sichtbar wird
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === target && entry.isIntersecting) {
          // Scroll wieder erlauben
          window.removeEventListener('wheel', this.prevent);
          window.removeEventListener('touchmove', this.prevent);
          window.removeEventListener('keydown', this.keyBlock);
          scrollObserver.disconnect();
        }
      });
    });

    scrollObserver.observe(target);
  }
}
