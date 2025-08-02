import { Component, inject } from "@angular/core";
import { ShowcaseDataService } from "../showcase-data.service";
import { ProjectComponent } from "./project/project.component";
import { TranslateModule } from "@ngx-translate/core";
import { SectionLayoutService } from "../services/section-layout.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-portfolio",
  imports: [ProjectComponent, TranslateModule, CommonModule],
  templateUrl: "./portfolio.component.html",
  styleUrl: "./portfolio.component.scss",
})
export class PortfolioComponent {
  showcaseData = inject(ShowcaseDataService);

  constructor(public sectionLayoutService: SectionLayoutService) {}

  ngOnInit(): void {
    this.sectionLayoutService.startViewportObserver();
  }
}
