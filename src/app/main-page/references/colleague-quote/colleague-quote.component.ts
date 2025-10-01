import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ShowcaseDataService } from "../../services/showcase-data.service";

@Component({
  selector: "app-colleague-quote",
  imports: [CommonModule, TranslateModule],
  templateUrl: "./colleague-quote.component.html",
  styleUrl: "./colleague-quote.component.scss",
})
export class ColleagueQuoteComponent {
  @Input() testimonilaNumber: number = 0;

  showcaseData = inject(ShowcaseDataService);

  isHovered: boolean = false;

  activateHover(): void {
    this.isHovered = true;
  }

  deactivateHover(): void {
    this.isHovered = false;
  }
}
