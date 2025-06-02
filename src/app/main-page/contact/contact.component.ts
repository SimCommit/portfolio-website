import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  firstClickName = false;

  nameInput: InputField = {
    isChecked: false,
    isClickedFirstTime: false,
  };

  checkboxInput: InputField = {
    isChecked: false,
    isClickedFirstTime: false,
  };

  toggleCheckedState(inputToToggle:InputField): void {
    inputToToggle.isChecked = !inputToToggle.isChecked;
  }

  activateFirstClick(inputToActivate: InputField): void {
    inputToActivate.isClickedFirstTime = true;
  }
}

interface InputField {
  isChecked: boolean;
  isClickedFirstTime: boolean;
}
