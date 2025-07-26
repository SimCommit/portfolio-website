import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageStateService } from '../../page-state.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

 constructor(public pageStateService: PageStateService) { }

}
