import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShowcaseDataService } from '../../showcase-data.service';

@Component({
  selector: 'app-colleague-quote',
  imports: [CommonModule],
  templateUrl: './colleague-quote.component.html',
  styleUrl: './colleague-quote.component.scss',
})
export class ColleagueQuoteComponent {

  showcaseData = inject(ShowcaseDataService);

  isHovered: boolean = false;

  activateHover(): void {
    this.isHovered = true;
  }

  deactivateHover(): void {
    this.isHovered = false;
  }
}
