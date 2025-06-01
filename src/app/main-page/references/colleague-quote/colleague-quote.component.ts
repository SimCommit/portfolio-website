import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-colleague-quote',
  imports: [CommonModule],
  templateUrl: './colleague-quote.component.html',
  styleUrl: './colleague-quote.component.scss',
})
export class ColleagueQuoteComponent {
  isHovered: boolean = false;

  activateHover():void {
    this.isHovered = true;
  }

  deactivateHover():void {
    this.isHovered = false;
  }
}
