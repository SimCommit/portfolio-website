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

  colleagueQuotes: Testimonial[] = [
    {
      name: 'Vadim Michel',
      quote:
        'main-page.references.colleague-quote.quote-1',
      role: 'main-page.references.colleague-quote.role-1',
      profileUrl: '',
    },
    {
      name: 'Mirkan Polat',
      quote:
        'main-page.references.colleague-quote.quote-2',
      role: 'main-page.references.colleague-quote.role-2',
      profileUrl: 'https://github.com/MirkanPolat',
    },
    {
      name: 'Vadim Michel',
      quote:
        'main-page.references.colleague-quote.quote-1',
      role: 'main-page.references.colleague-quote.role-1',
      profileUrl: '',
    },
  ];

  myProjects: Project[] = [
    {
      backgroundColor: '#F9AF42',
      picUrl: './assets/img/portfolio/project-preview-placeholder.svg',
      cogwheelUrl: './assets/img/portfolio/project/cogwheel-180.svg',
      learning:"main-page.portfolio.project.learning-join",
      name: 'Join',
      emojiUrl: './assets/img/icons/project/emoji-checkmark.svg',
      usedSkills: 'Angular | TypeScript | Firebase | HTML | CSS',
      description: 'main-page.portfolio.project.description-join',
      gitHubUrl: 'https://github.com/SimonMFuchs',
      projectUrl: '',
    },
    {
      backgroundColor: '#679AAC',
      picUrl: './assets/img/portfolio/project/el-pollo-loco.svg',
      cogwheelUrl: './assets/img/portfolio/project/cogwheel-180.svg',
      learning:"main-page.portfolio.project.learning-el-pollo-loco",
      name: 'El Pollo Loco',
      emojiUrl: './assets/img/icons/project/emoji-chick.svg',
      usedSkills: 'JavaScript | HTML | CSS',
      description: 'main-page.portfolio.project.description-el-pollo-loco',
      gitHubUrl: 'https://github.com/SimonMFuchs/el-pollo-loco',
      projectUrl: 'https://simon-fuchs.developerakademie.net/el-pollo-loco/index.html',
    },
    {
      backgroundColor: '#FF834F',
      picUrl: './assets/img/portfolio/project/pokedex-3.svg',
      cogwheelUrl: './assets/img/portfolio/project/cogwheel-180-yellow.svg',
      learning:"main-page.portfolio.project.learning-pokedex",
      name: 'Pokédex',
      emojiUrl: './assets/img/icons/project/pokeball.svg',
      usedSkills: 'JavaScript | CSS | HTML | API',
      description: 'main-page.portfolio.project.description-pokedex',
      gitHubUrl: 'https://github.com/SimonMFuchs/pokedex',
      projectUrl: 'https://simon-fuchs.developerakademie.net/pokedex/index.html',
    },
  ];

  currentProject: number = 1;

  constructor() {}
}

interface Tech {
  imgUrl: string;
  name: string;
}

interface Testimonial {
  name: string;
  quote: string;
  role: string;
  profileUrl: string;
}

interface Project {
  backgroundColor: string;
  picUrl: string;
  cogwheelUrl: string;
  learning:string;
  name: string;
  emojiUrl: string;
  usedSkills: string;
  description: string;
  gitHubUrl: string;
  projectUrl: string;
}
