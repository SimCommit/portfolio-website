import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainPageStateService {
  currentSection: number = 1;

  currentBackground: string[] = [
    '#679AAC',
    '#F8F7E5',
    '#1D1D1D',
    '#F8F7E5',
    '#679AAC',
    '#1D1D1D',
    '',
  ];

  mobileView: boolean = false;

  constructor() {}
}
