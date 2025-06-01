import { Component, inject } from '@angular/core';
import { ShowcaseDataService } from '../showcase-data.service';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

    showcaseData = inject(ShowcaseDataService);

}
