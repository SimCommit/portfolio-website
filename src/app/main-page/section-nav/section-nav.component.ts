import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MainPageStateService } from '../main-page-state.service';

@Component({
  selector: 'app-section-nav',
  imports: [],
  templateUrl: './section-nav.component.html',
  styleUrl: './section-nav.component.scss'
})
export class SectionNavComponent {
  mainPageState = inject(MainPageStateService);

  constructor() {}

  @ViewChild('contact', { static: false, read: ElementRef })
  contactRef!: ElementRef;
  
}
