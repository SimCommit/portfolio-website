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
import { MainPageStateService } from './main-page-state.service';

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
  mainPageState = inject(MainPageStateService);

  @ViewChildren('section', { read: ElementRef })
  private sectionRefs!: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit(): void {
    const elements = this.sectionRefs.map((ref) => ref.nativeElement);
    this.mainPageState.setSectionRefs(elements);
  }

  private onWheel = (event: WheelEvent): void => {
    if (this.mainPageState.isScrolling) return;

    event.stopImmediatePropagation();

    if (event.deltaY > 0) {
      this.mainPageState.nextSection();
    } else {
      this.mainPageState.previousSection();
    }

    event.preventDefault();
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    if (this.mainPageState.isScrolling) return;

    event.stopImmediatePropagation();

    if (
      ['ArrowDown', 'PageDown'].includes(event.key) ||
      event.key === ' ' ||
      event.code === 'Space'
    ) {
      this.mainPageState.nextSection();

      event.preventDefault();
    }

    if (['ArrowUp', 'PageUp'].includes(event.key)) {
      this.mainPageState.previousSection();

      event.preventDefault();
    }
  };

  ngOnInit(): void {
    this.mainPageState.isScrolling = true;
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('keydown', this.onKeyDown, { passive: false });
    window.scrollTo({ top: 0, behavior: 'auto' });
    setTimeout(() => {
      this.mainPageState.isScrolling = false;
    }, 500);
  }

  ngOnDestroy(): void {
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('keydown', this.onKeyDown);
  }
  
}
