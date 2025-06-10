import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SectionNavComponent } from './section-nav/section-nav.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from '../shared/header/header.component';

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
export class MainPageComponent {}
