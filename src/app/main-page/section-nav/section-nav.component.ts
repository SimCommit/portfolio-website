import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { MainPageScrollService } from "../main-page-scroll.service";
import { SectionLayoutService } from "../services/section-layout.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-section-nav",
  imports: [],
  templateUrl: "./section-nav.component.html",
  styleUrl: "./section-nav.component.scss",
})
export class SectionNavComponent {
  @ViewChild("nav") navRef!: ElementRef<HTMLElement>;
  private subscription!: Subscription;

  constructor(
    public mainPageScrollService: MainPageScrollService,
    private sectionLayoutService: SectionLayoutService,
    private renderer: Renderer2
  ) // private element: ElementRef
  {}

  // ngAfterViewInit(): void {
  //   this.subscription = this.sectionLayoutService.sectionHeight$.subscribe((height) => {
  //     this.updateNavHeight(height);
  //   });
  // }

  updateNavHeight(height: number): void {
    this.renderer.setStyle(this.navRef.nativeElement, "height", `min(${height}px, 900px)`);
    console.log(height);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
