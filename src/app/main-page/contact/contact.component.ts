import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../shared/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [PrimaryButtonComponent, CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  isChecked:boolean = false;

  firstTouch:boolean = false;

  toggleCheckedState():void {
    this.isChecked = !this.isChecked;
  }

  activateFirstTouch():void {
    this.firstTouch = true;
  }

}
