import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { SectionNavComponent } from './section-nav/section-nav.component';
import { AboutMeComponent } from "./about-me/about-me.component";
import { SkillsComponent } from './skills/skills.component';

@Component({
  selector: 'app-main-page',
  imports: [HeroComponent, SectionNavComponent, AboutMeComponent, SkillsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
