import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  firstClickName = false;

  nameInput: InputFieldStates = {
    isChecked: false,
    isClickedFirstTime: false,
  };

  checkboxInput: InputFieldStates = {
    isChecked: false,
    isClickedFirstTime: false,
  };

  toggleCheckedState(inputToToggle:InputFieldStates): void {
    inputToToggle.isChecked = !inputToToggle.isChecked;
  }

  activateFirstClick(inputToActivate: InputFieldStates): void {
    inputToActivate.isClickedFirstTime = true;
  }
}

interface InputFieldStates {
  isChecked: boolean;
  isClickedFirstTime: boolean;
}
