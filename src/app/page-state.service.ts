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

  redirectToMainPage(fragment: string): void {
    this.router.navigate(["/"], { fragment: fragment });
  }

  isOnLegalPage() {
    return (
      this.router.url === "/legal-notice/en" ||
      this.router.url === "/legal-notice/de" ||
      this.router.url === "/privacy-policy/en" ||
      this.router.url === "/privacy-policy/de"
    );
  }

  isNotOnMainPage() {
    return (
      this.router.url !== "/" &&
      this.router.url !== "/#hero" &&
      this.router.url !== "/#about-me" &&
      this.router.url !== "/#skills" &&
      this.router.url !== "/#portfolio" &&
      this.router.url !== "/#references" &&
      this.router.url !== "/#contact"
    );
  }
}
