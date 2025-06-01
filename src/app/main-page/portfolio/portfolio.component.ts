import { Component, inject } from '@angular/core';
import { ShowcaseDataService } from '../showcase-data.service';
import { ProjectComponent } from './project/project.component';

@Component({
  selector: 'app-portfolio',
  imports: [ProjectComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

    showcaseData = inject(ShowcaseDataService);

}
