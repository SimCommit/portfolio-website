import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainPageStateService {
  currentSection: number = 1;

  anchors: string[] = [
    '#',
    '#hero',
    '#about-me',
    '#skills',
    '#portfolio',
    '#references',
    '#contact',
  ];

  currentBackground: string[] = [
    '',
    '#679AAC',
    '#F8F7E5',
    '#1D1D1D',
    '#F8F7E5',
    '#679AAC',
    '#1D1D1D',
  ];

  currentLanguage: 'de' | 'en' = 'en';

  hideMenu: boolean = true;

  burgerMenuIsOpen: boolean = false;

  mobileView: boolean = true;

  constructor() {}
}
