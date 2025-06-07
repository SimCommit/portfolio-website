import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, FooterComponent, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  submittedContact: ContactData = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log(this.submittedContact);
    }
  }

  nameInput: InputFieldStates = {
    isChecked: false,
  };

  checkboxInput: InputFieldStates = {
    isChecked: false,
  };

  toggleCheckedState(inputToToggle: InputFieldStates): void {
    inputToToggle.isChecked = !inputToToggle.isChecked;
  }

}

interface InputFieldStates {
  isChecked: boolean;
}

interface ContactData {
  name: string;
  email: string;
  message: string;
}
