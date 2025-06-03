import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowcaseDataService {
  myTechs: Tech[] = [
    { imgUrl: './assets/img/skills/html.svg', name: 'HTML' },
    { imgUrl: './assets/img/skills/css.svg', name: 'CSS' },
    { imgUrl: './assets/img/skills/javascript.svg', name: 'JavaScript' },
    { imgUrl: './assets/img/skills/typescript.svg', name: 'TypeScript' },
    { imgUrl: './assets/img/skills/angular.svg', name: 'Angular' },
    { imgUrl: './assets/img/skills/firebase.svg', name: 'Firebase' },
    { imgUrl: './assets/img/skills/git.svg', name: 'Git' },
    { imgUrl: './assets/img/skills/rest-api.svg', name: 'REST API' },
    { imgUrl: './assets/img/skills/scrum.svg', name: 'Scrum' },
  ];

  techsOnMyRadar: Tech[] = [
    { imgUrl: './assets/img/skills/react.svg', name: 'React' },
    { imgUrl: './assets/img/skills/vue.js.svg', name: 'Vue.js' },
    // { imgUrl: "./assets/img/skills/material-design.svg", name: "Material Design" },
  ];

  constructor() {}
}

interface Tech {
  imgUrl: string;
  name: string;
}
