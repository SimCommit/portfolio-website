import { Component, inject } from '@angular/core';
import { MainPageScrollService } from '../main-page-scroll.service';

@Component({
  selector: 'app-section-nav',
  imports: [],
  templateUrl: './section-nav.component.html',
  styleUrl: './section-nav.component.scss'
})
export class SectionNavComponent {

  constructor(public mainPageScrollService: MainPageScrollService) {}  
}
