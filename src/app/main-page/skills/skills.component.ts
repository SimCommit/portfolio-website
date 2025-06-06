import { Component, inject } from '@angular/core';
import { GrowthMindsetComponent } from './growth-mindset/growth-mindset.component';
import { ShowcaseDataService } from '../showcase-data.service';

@Component({
  selector: 'app-skills',
  imports: [GrowthMindsetComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  showcaseData = inject(ShowcaseDataService);
}

