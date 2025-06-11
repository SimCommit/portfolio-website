import { Component, inject } from '@angular/core';
import { ShowcaseDataService } from '../../showcase-data.service';
import { TranslateModule } from '@ngx-translate/core';
import { MainPageStateService } from '../../main-page-state.service';

@Component({
  selector: 'app-growth-mindset',
  imports: [TranslateModule],
  templateUrl: './growth-mindset.component.html',
  styleUrl: './growth-mindset.component.scss',
})
export class GrowthMindsetComponent {
  mainPageState = inject(MainPageStateService);

  showcaseData = inject(ShowcaseDataService);
}
