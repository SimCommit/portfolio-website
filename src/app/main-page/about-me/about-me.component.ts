import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { AboutMeOverlayComponent } from "./about-me-overlay/about-me-overlay.component";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { MainPageScrollService } from "../main-page-scroll.service";
import { SectionLayoutService } from "../services/section-layout.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-about-me",
  imports: [AboutMeOverlayComponent, TranslateModule, CommonModule],
  templateUrl: "./about-me.component.html",
  styleUrl: "./about-me.component.scss",
})
export class AboutMeComponent {
  emojiIsHovered: boolean = false;

  private subscription!: Subscription;

  @ViewChild("aboutMeSection") aboutMeSectionRef!: ElementRef<HTMLElement>;
  @ViewChild("appAboutMeOverlay") appAboutMeOverlayRef!: ElementRef<HTMLElement>;

  constructor(
    public mainPageScrollService: MainPageScrollService,
    private sectionLayoutService: SectionLayoutService
  ) {}

  ngAfterViewInit(): void {
    this.sectionLayoutService.startViewportObserver();
    this.initSectionHeightObserver();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  initSectionHeightObserver() {
    this.subscription = this.sectionLayoutService.sectionHeight$.subscribe((height) => {
      this.aboutMeSectionRef.nativeElement.style.height = height;
      // console.log(height);
    });
  }

  changeHoverState(state: boolean): void {
    this.emojiIsHovered = state;
  }
}
