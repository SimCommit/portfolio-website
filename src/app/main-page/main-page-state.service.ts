import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainPageStateService {

  currentSection:number = 3;

  mobileView:boolean = false;

  constructor() { }
}
