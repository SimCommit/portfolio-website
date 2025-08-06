import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PageStateService {
  currentLanguage: "de" | "en" = "en";

  hideMenu: boolean = true;

  burgerMenuIsOpen: boolean = false;

  constructor(private router: Router) {}

  redirectIfOnLegalPage(fragment: string): void {
    if (
      this.router.url === "/legal-notice/en" ||
      this.router.url === "/legal-notice/de" ||
      this.router.url === "/privacy-policy/en" ||
      this.router.url === "/privacy-policy/de"
    ) {
      this.router.navigate(["/"], { fragment: fragment });
      console.log("redirect from legal to: ", fragment);
    }
  }

  isOnLegalPage() {
    return (
      this.router.url === "/legal-notice/en" ||
      this.router.url === "/legal-notice/de" ||
      this.router.url === "/privacy-policy/en" ||
      this.router.url === "/privacy-policy/de"
    );
  }
}
