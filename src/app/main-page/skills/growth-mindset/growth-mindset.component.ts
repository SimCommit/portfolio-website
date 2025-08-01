import { Component } from "@angular/core";
import { ShowcaseDataService } from "../../showcase-data.service";
import { TranslateModule } from "@ngx-translate/core";
import { BreakpointObserverService } from "../../../breakpoint-observer.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-growth-mindset",
  imports: [TranslateModule, AsyncPipe],
  templateUrl: "./growth-mindset.component.html",
  styleUrl: "./growth-mindset.component.scss",
})
export class GrowthMindsetComponent {
  constructor(public showcaseData: ShowcaseDataService, public breakpointObserverService: BreakpointObserverService) {}
}
