import { Component, inject } from '@angular/core';
import { ShowcaseDataService } from '../../showcase-data.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-growth-mindset',
  imports: [TranslateModule],
  templateUrl: './growth-mindset.component.html',
  styleUrl: './growth-mindset.component.scss'
})
export class GrowthMindsetComponent {

  showcaseData = inject(ShowcaseDataService)

}


