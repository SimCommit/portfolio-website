import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  // ngModel in form tag requires standalone or name attribute
  standalone: true,
  imports: [PrimaryButtonComponent, CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  isChecked:boolean = false;

  toggleCheckedState(){
    this.isChecked = !this.isChecked;
  }

}
