import { Component, inject } from '@angular/core';
import { ShowcaseDataService } from '../../showcase-data.service';

@Component({
  selector: 'app-growth-mindset',
  imports: [],
  templateUrl: './growth-mindset.component.html',
  styleUrl: './growth-mindset.component.scss'
})
export class GrowthMindsetComponent {

  showcaseData = inject(ShowcaseDataService)

}


