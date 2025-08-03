import { Component } from "@angular/core";
import { ColleagueQuoteComponent } from "./colleague-quote/colleague-quote.component";
import { TranslateModule } from "@ngx-translate/core";
import { SectionLayoutService } from "../services/section-layout.service";
import { AsyncPipe, CommonModule } from "@angular/common";

@Component({
  selector: "app-references",
  imports: [ColleagueQuoteComponent, TranslateModule, AsyncPipe, CommonModule],
  templateUrl: "./references.component.html",
  styleUrl: "./references.component.scss",
})
export class ReferencesComponent {
  constructor(public sectionLayoutService: SectionLayoutService) {}

  ngOnInit(): void {
    this.sectionLayoutService.startViewportObserver();
  }
}
