import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ShowcaseDataService } from '../../services/showcase-data.service';

@Component({
  selector: 'app-project',
  imports: [TranslateModule, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  showcaseData = inject(ShowcaseDataService);

  emojiIsHovered:boolean = false;

  previousProjcet(): void {
    if (this.showcaseData.currentProject > 0) {
      this.showcaseData.currentProject--;
    } else {
      this.showcaseData.currentProject = this.showcaseData.myProjects.length - 1;
    }
  }

  nextProjcet(): void {
    if (
      this.showcaseData.currentProject < this.showcaseData.myProjects.length - 1
    ) {
      this.showcaseData.currentProject++;
    } else {
      this.showcaseData.currentProject = 0;
    }
  }

  changeHoverState(state:boolean):void {
    this.emojiIsHovered = state;   
  }
}
