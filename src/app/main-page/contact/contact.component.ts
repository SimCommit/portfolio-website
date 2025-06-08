import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, FooterComponent, RouterLink, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  http = inject(HttpClient);

  nameInput: InputFieldStates = {
    isChecked: false,
  };

  checkboxInput: InputFieldStates = {
    isChecked: false,
  };

  toggleCheckedState(inputToToggle: InputFieldStates): void {
    inputToToggle.isChecked = !inputToToggle.isChecked;
  }

  contactData: ContactDataModel = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = true;

  post = {
    endPoint: 'https://simon-fuchs.developerakademie.net/angular-projects/simon-fuchs/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
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
