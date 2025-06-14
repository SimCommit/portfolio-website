import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
  HostListener,
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

  constructor(private scrollService: MainPageStateService) {}

  ngAfterViewInit(): void {
    const elements = this.sectionRefs.map((ref) => ref.nativeElement);
    this.scrollService.setSectionRefs(elements);
  }

  private onWheel = (event: WheelEvent) => {
    console.log(event.deltaY);
    event.stopImmediatePropagation();

    if (event.deltaY > 0) {
      console.log('Wheele');
      this.mainPageState.nextSection();
    } else {
      console.log('else');
      this.mainPageState.previousSection();
    }

    event.preventDefault();
    return false;
  };

  ngOnInit(): void {
    window.addEventListener('wheel', this.onWheel, { passive: false });
  }

  ngOnDestroy(): void {
    window.removeEventListener('wheel', this.onWheel);
  }

  //   @HostListener('window:wheel', ['$event']) onScroll(event: WheelEvent) {
  //   console.log(event.deltaY, this.mainPageState.isScrolling);
  //   event.stopImmediatePropagation();

  //   if (this.mainPageState.isScrolling) return;
  //   if (event.deltaY > 0) {
  //     console.log('Wheele');

  //     // this.nextSection();
  //   } else {
  //     // this.previousSection();
  //     console.log('else');
  //   }
  //   event.preventDefault();
  //   return false;
  // }
}
