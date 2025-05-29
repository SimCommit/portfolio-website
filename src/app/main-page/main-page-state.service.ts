import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainPageStateService {

  currentSection:number = 2;

  constructor() { }
}
