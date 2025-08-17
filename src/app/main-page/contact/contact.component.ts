import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { FooterComponent } from "../../shared/footer/footer.component";
import { RouterLink } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { PageStateService } from "../../page-state.service";
import { MainPageScrollService } from "../main-page-scroll.service";

@Component({
  selector: "app-contact",
  imports: [CommonModule, FormsModule, FooterComponent, RouterLink, TranslateModule],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent {
  http = inject(HttpClient);

  nameIsFocused: boolean = false;
  emailIsFocused: boolean = false;
  messageIsFocused: boolean = false;

  nameInput: InputFieldStates = {
    isChecked: false,
  };

  checkboxInput: InputFieldStates = {
    isChecked: false,
  };

  constructor(public pageStateService: PageStateService, public mainPageScrollService: MainPageScrollService) {}

  toggleCheckedState(inputToToggle: InputFieldStates): void {
    inputToToggle.isChecked = !inputToToggle.isChecked;
  }

  contactData: ContactDataModel = {
    name: "",
    email: "",
    message: "",
  };

  mailTest = false;

  post = {
    endPoint: "https://simon-fuchs.net/sendMail.php",
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        "Content-Type": "application/json",
        responseType: "text" as const,
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData)).subscribe({
        next: (response) => {
          ngForm.resetForm();
          this.pageStateService.sendEmailWasSuccessful = true;
          this.openEmailFeedbackOverlay();
        },
        error: (error) => {
          console.error(error);
          this.pageStateService.sendEmailWasSuccessful = false;
          this.openEmailFeedbackOverlay();
        },
        complete: () => console.info("send post complete"),
      });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      console.log(this.contactData);
      this.pageStateService.sendEmailWasSuccessful = true;
      this.openEmailFeedbackOverlay();
      ngForm.resetForm();
    }
  }

  openEmailFeedbackOverlay(): void {
    console.log("hideEmailFeedback ", this.pageStateService.hideEmailFeedback);
    console.log("emailFeedbackIsOpen ", this.pageStateService.emailFeedbackIsOpen);

    this.mainPageScrollService.lockScroll();
    this.hideOverflowOnBody();
    this.pageStateService.hideEmailFeedback = false;
    setTimeout(() => {
      this.pageStateService.emailFeedbackIsOpen = true;
    }, 0);
  }

  hideOverflowOnBody() {
    const body: HTMLElement = document.body;
    body.classList.add("scroll-locked");
  }
}

interface InputFieldStates {
  isChecked: boolean;
}

interface ContactDataModel {
  name: string;
  email: string;
  message: string;
}
