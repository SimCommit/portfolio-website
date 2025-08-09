import { Component, inject } from "@angular/core";
import { GrowthMindsetComponent } from "./growth-mindset/growth-mindset.component";
import { ShowcaseDataService } from "../showcase-data.service";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { SectionLayoutService } from "../services/section-layout.service";
import { BreakpointObserverService } from "../../breakpoint-observer.service";

@Component({
  selector: "app-skills",
  imports: [GrowthMindsetComponent, TranslateModule, CommonModule],
  templateUrl: "./skills.component.html",
  styleUrl: "./skills.component.scss",
})
export class SkillsComponent {
  showcaseData = inject(ShowcaseDataService);

  emojiIsHovered: boolean = false;

  constructor(
    public sectionLayoutService: SectionLayoutService,
    public breakpointObserverService: BreakpointObserverService
  ) {}

  ngOnInit(): void {
    this.sectionLayoutService.startViewportObserver();
  }

  changeHoverState(state: boolean): void {
    this.emojiIsHovered = state;
  }
}
