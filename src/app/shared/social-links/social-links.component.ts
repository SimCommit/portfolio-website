import { Component, Input } from "@angular/core";

@Component({
  selector: "app-social-links",
  imports: [],
  templateUrl: "./social-links.component.html",
  styleUrl: "./social-links.component.scss",
})
export class SocialLinksComponent {
  @Input() isInBurgerMenu: boolean = false;

  prevent(event: Event) {
    event.stopPropagation();
  }
}
