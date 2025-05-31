import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/primary-button/primary-button.component';

@Component({
  selector: 'app-hero',
  imports: [PrimaryButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
