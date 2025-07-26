import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PageStateService {
  currentLanguage: "de" | "en" = "en";

  hideMenu: boolean = true;

  burgerMenuIsOpen: boolean = false;

  mobileView: boolean = false;

  constructor(private router: Router) {}

  redirectIfOnLegalPage() {
    if (
      this.router.url === "/legal-notice/en" ||
      this.router.url === "/legal-notice/de" ||
      this.router.url === "/privacy-policy/en" ||
      this.router.url === "/privacy-policy/de"
    ) {
      this.router.navigate(["/"], { fragment: "about-me" });

      // this.router.navigate(['/'], { state: { scrollTo: 'about-me' } });

      // this.router.navigate(['/']).then(() => {
      //   console.log('111');

      //   setTimeout(() => {
      //     console.log('222');

      //     this.scrollToSection('about-me');
      //   }, 500);
      // });
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
