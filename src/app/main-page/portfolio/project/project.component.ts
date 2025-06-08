import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ShowcaseDataService } from '../../showcase-data.service';

@Component({
  selector: 'app-project',
  imports: [TranslateModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  showcaseData = inject(ShowcaseDataService);

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
}
