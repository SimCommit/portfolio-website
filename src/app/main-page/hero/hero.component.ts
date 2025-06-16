import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MainPageStateService } from '../main-page-state.service';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  mainPageState = inject(MainPageStateService);

  
}
