import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainPageStateService } from '../../main-page/main-page-state.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

    mainPageState = inject(MainPageStateService);


}
