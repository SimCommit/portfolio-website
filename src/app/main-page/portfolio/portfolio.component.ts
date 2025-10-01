import { Component, inject } from "@angular/core";
import { ProjectComponent } from "./project/project.component";
import { TranslateModule } from "@ngx-translate/core";
import { SectionLayoutService } from "../services/section-layout.service";
import { CommonModule } from "@angular/common";
import { ShowcaseDataService } from "../services/showcase-data.service";

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
