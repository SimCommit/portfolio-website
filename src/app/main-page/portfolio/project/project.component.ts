import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { ShowcaseDataService } from "../../services/showcase-data.service";

@Component({
  selector: "app-project",
  imports: [TranslateModule, CommonModule],
  templateUrl: "./project.component.html",
  styleUrl: "./project.component.scss",
})
export class ProjectComponent {
  @ViewChild("previewVideo") previewVideo!: ElementRef<HTMLVideoElement>;

  cogwheelIsHovered: boolean = true;

  showcaseData = inject(ShowcaseDataService);

  emojiIsHovered: boolean = false;

  // Intervall for video loop
  videoLoopInterval: ReturnType<typeof setInterval> | undefined = undefined;

  ngAfterViewInit(): void {
    this.loadVideo();
  }

  setButtonText(direction: "next" | "previous") {
    if (window.innerWidth > 920) {
      return `main-page.portfolio.project.button-${direction}`;
    } else {
      return `main-page.portfolio.project.button-${direction}-mobile`;
    }
  }

  loadVideo(): void {
    let video = this.previewVideo.nativeElement;
    video.muted = true;
    video.playsInline = true;
    video.src = this.showcaseData.myProjects[this.showcaseData.currentProject].videoUrl;
  }

  pauseVideo(): void {
    let video = this.previewVideo.nativeElement;

    video.pause();
  }

  playVideo(): void {
    let video = this.previewVideo.nativeElement;

    if (video.getAttribute("src") === "") {
      return;
    }

    clearInterval(this.videoLoopInterval);
    video.play();
    this.videoLoopInterval = setInterval(() => {
      if (video.paused && this.cogwheelIsHovered) {
        video.play();
      }
    }, 500);
  }

  previousProjcet(): void {
    clearInterval(this.videoLoopInterval);
    if (this.showcaseData.currentProject > 0) {
      this.showcaseData.currentProject--;
    } else {
      this.showcaseData.currentProject = this.showcaseData.myProjects.length - 1;
    }
  }

  nextProjcet(): void {
    clearInterval(this.videoLoopInterval);
    if (this.showcaseData.currentProject < this.showcaseData.myProjects.length - 1) {
      this.showcaseData.currentProject++;
    } else {
      this.showcaseData.currentProject = 0;
    }
  }

  changeHoverState(state: boolean): void {
    this.emojiIsHovered = state;
  }
}
