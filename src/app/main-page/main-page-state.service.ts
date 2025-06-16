import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  setSectionRefs(refs: Element[]) {
    this.sections = refs;

    // console.log(this.sections);
  }

  nextSection(): void {
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

  previousSection(): void {
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

  scrollToSection(sectionId: string): void {
    if (this.isScrolling) return;
    console.log(sectionId);

    const element = document.getElementById(sectionId);
    // const index = this.anchors.indexOf(sectionId);

    if (element) {
      this.isScrolling = true;
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
    }
  }

  updateCurrentSection(newSectionIndex: number): void {
    console.log(
      'old index: ' + this.currentSectionIndex,
      'new index: ' + newSectionIndex
    );
    if (this.currentSectionIndex === newSectionIndex) return;

    this.currentSectionIndex = newSectionIndex;
    console.log('final index: ' + this.currentSectionIndex);
  }

  redirectIfOnLegalPage() {
    if (
      this.router.url === '/legal-notice/en' ||
      this.router.url === '/legal-notice/de' ||
      this.router.url === '/privacy-policy/en' ||
      this.router.url === '/privacy-policy/de'
    ) {
      this.router.navigate(['/']).then(() => {
        console.log('111');

        setTimeout(() => {
          console.log('222');

          this.scrollToSection('about-me');
        }, 500);
      });
    }
  }
}
