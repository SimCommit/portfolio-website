import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SectionNavComponent } from './section-nav/section-nav.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from '../shared/header/header.component';
// import { MainPageStateService } from './main-page-state.service';
import { MainPageScrollService } from './main-page-scroll.service';

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
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
  // mainPageStateService = inject(MainPageStateService);

  @ViewChildren('section', { read: ElementRef })
  private sectionRefs!: QueryList<ElementRef>;

  constructor(private mainPageScrollService: MainPageScrollService) {}

  ngAfterViewInit(): void {
    const elements = this.sectionRefs.map((ref) => ref.nativeElement);
    this.mainPageScrollService.setSectionRefs(elements);
  }

  private onWheel = (event: WheelEvent): void => {
    if (this.mainPageScrollService.isScrolling) return;

    event.stopImmediatePropagation();

    if (event.deltaY > 0) {
      this.mainPageScrollService.nextSection();
    } else {
      this.mainPageScrollService.previousSection();
    }

    event.preventDefault();
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    if (this.mainPageScrollService.isScrolling) return;

    event.stopImmediatePropagation();

    if (
      ['ArrowDown', 'PageDown'].includes(event.key) ||
      event.key === ' ' ||
      event.code === 'Space'
    ) {
      this.mainPageScrollService.nextSection();

      event.preventDefault();
    }

    if (['ArrowUp', 'PageUp'].includes(event.key)) {
      this.mainPageScrollService.previousSection();

      event.preventDefault();
    }
  };

  ngOnInit(): void {
    this.mainPageScrollService.isScrolling = true;
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('keydown', this.onKeyDown, { passive: false });
    window.scrollTo({ top: 0, behavior: 'auto' });
    setTimeout(() => {
      this.mainPageScrollService.isScrolling = false;
    }, 500);
  }

  ngOnDestroy(): void {
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
