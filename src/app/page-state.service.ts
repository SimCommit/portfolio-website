import { StickyDirection } from "@angular/cdk/table";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PageStateService {
  userLang: string = navigator.language.slice(0,2);

  currentLanguage: "de" | "en";

  hideMenu: boolean = true;
  burgerMenuIsOpen: boolean = false;

  hideEmailFeedback: boolean = true;
  emailFeedbackIsOpen: boolean = false;
  sendEmailWasSuccessful: boolean = false;

  constructor(private router: Router) {
    this.currentLanguage = this.convertString(this.userLang);
  }

  convertString(userLang: string): "de" | "en" {
    let lang: "de" | "en";

    if (userLang !== "de" && userLang !== "en") {
      lang = "en";
    } else {
      lang = userLang;  
    }

    return lang;
  }

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
