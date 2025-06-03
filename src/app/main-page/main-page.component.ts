import { Component, ElementRef, HostListener } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SectionNavComponent } from './section-nav/section-nav.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-main-page',
  imports: [
    HeroComponent,
    SectionNavComponent,
    AboutMeComponent,
    SkillsComponent,
    PortfolioComponent,
    ReferencesComponent,
    ContactComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  sections: string[] = [
    'app-hero',
    'app-about-me',
    'app-skills',
    'app-portfolio',
    'app-references',
    'app-contact',
  ];
  currentSectionIndex: number = 0;
  lastScrolled = '';
  isScrolling = false;
  sections1 = [];
  activeSection: any; // :((((((((((((((((((((((((((((((

  @HostListener('window:wheel', ['$event']) onScroll(event: WheelEvent) {
    console.log(event.deltaY, this.isScrolling);
    event.stopImmediatePropagation();
    if (this.isScrolling) return;
    if (event.deltaY > 0) {
      this.nextSection();
    } else {
      this.previousSection();
    }
    event.preventDefault();
    return false;
  }

  nextSection() {
    if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.sections[this.currentSectionIndex]);
    }
  }

  previousSection() {
    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.sections[this.currentSectionIndex]);
    }
  }

  scrollToSection(sectionId: string) {
    this.isScrolling = true;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        this.isScrolling = false;
      }, 1000); // Adjust time to match scroll duration
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    window.addEventListener('wheel', (e) => e.preventDefault(), {
      passive: false,
    });
    this.sections1 = Array.from(document.querySelectorAll('app-main-page'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index: number) => {
          const body: HTMLBodyElement = document.querySelector(
            'body'
          ) as HTMLBodyElement;
          console.log(entry.target.id, this.activeSection);
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.1 &&
            entry.intersectionRatio < 0.2 &&
            entry.target.id !== this.activeSection
          ) {
            console.log('apply', entry, entry.target);
            //change active link
            this.activeSection = entry.target.id;
            // body.classList.add('no-scroll');
            const endScroll = Math.round(
              entry.target.getBoundingClientRect().top +
                document.documentElement.scrollTop
            );
            console.log(0, endScroll);
            window.scroll(0, endScroll);
          }
        });
      },
      { threshold: [0.1] }
    );

    this.sections1.forEach((section: any) => observer.observe(section));
  }
}
