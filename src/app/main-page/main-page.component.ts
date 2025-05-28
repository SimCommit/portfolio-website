import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { SectionNavComponent } from './section-nav/section-nav.component';

@Component({
  selector: 'app-main-page',
  imports: [HeroComponent, SectionNavComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
