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
        // responseType: "text",
        responseType: "text" as const,
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData)).subscribe({
        next: (response) => {
          ngForm.resetForm();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.info("send post complete"),
      });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      console.log(this.contactData);

      ngForm.resetForm();
    }
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
