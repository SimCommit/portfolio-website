import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ShowcaseDataService {
  myTechs: Tech[] = [
    { imgUrl: "./assets/img/skills/angular.svg", name: "Angular" },
    { imgUrl: "./assets/img/skills/typescript.svg", name: "TypeScript" },
    { imgUrl: "./assets/img/skills/javascript.svg", name: "JavaScript" },
    { imgUrl: "./assets/img/skills/html.svg", name: "HTML" },
    { imgUrl: "./assets/img/skills/css.svg", name: "CSS" },
    { imgUrl: "./assets/img/skills/firebase.svg", name: "Firebase" },
    { imgUrl: "./assets/img/skills/rest-api.svg", name: "REST API" },
    { imgUrl: "./assets/img/skills/git.svg", name: "Git" },
    { imgUrl: "./assets/img/skills/scrum.svg", name: "Scrum" },
    { imgUrl: "./assets/img/skills/figma.svg", name: "Figma" },
  ];

  techsOnMyRadar: Tech[] = [
    // { imgUrl: "./assets/img/skills/java-with-black-bg.svg", name: "Java" },
    // { imgUrl: "./assets/img/skills/react-with-black-bg.svg", name: "React" },
    { imgUrl: "./assets/img/skills/java.svg", name: "Java" },
    { imgUrl: "./assets/img/skills/react.svg", name: "React" },
    // { imgUrl: "./assets/img/skills/vue.js.svg", name: "Vue.js" },
    // { imgUrl: "./assets/img/skills/material-design.svg", name: "Material Design" },
  ];

  colleagueQuotes: Testimonial[] = [
    {
      name: "Vadim Michel",
      quote: "main-page.references.colleague-quote.quote-1",
      role: "main-page.references.colleague-quote.role-1",
      profileUrl: "https://www.linkedin.com/in/vadim-michel-088792239/",
    },
    {
      name: "Robin Angelé",
      quote: "main-page.references.colleague-quote.quote-2",
      role: "main-page.references.colleague-quote.role-2",
      profileUrl: "https://www.linkedin.com/in/robin-angel%C3%A9/",
    },
    {
      name: "Markus Fischer",
      quote: "main-page.references.colleague-quote.quote-3",
      role: "main-page.references.colleague-quote.role-3",
      profileUrl: "https://www.linkedin.com/in/markus-fischer-mideasdesign/",
    },
    {
      name: "Mirkan Polat",
      quote: "main-page.references.colleague-quote.quote-2",
      role: "main-page.references.colleague-quote.role-2",
      profileUrl: "https://github.com/MirkanPolat",
    },
  ];

  // reduce video size of join-preview and add video URLs to all projects!
  myProjects: Project[] = [
    {
      name: "Join",
      backgroundColor: "#F9AF42",
      learningBgColor: "#679AAC",
      // videoUrl: "./assets/img/portfolio/project/join-preview-board-3.png",
      videoUrl: "./assets/img/portfolio/project/join-preview-video-5.mp4",
      cogwheelUrl: "./assets/img/portfolio/project/cogwheel-180.svg",
      learning: "main-page.portfolio.project.learning-join",
      emojiUrl: "./assets/img/icons/project/emoji-checkmark.svg",
      usedSkills: "Angular | TypeScript | Firebase | HTML | CSS",
      description: "main-page.portfolio.project.description-join",
      gitHubUrl: "https://github.com/SimCommit/join",
      projectUrl: "https://join.simon-fuchs.net/",
    },
    {
      name: "El Pollo Loco",
      backgroundColor: "#679AAC",
      learningBgColor: "#FF834F",
      // videoUrl: "./assets/img/portfolio/project/el-pollo-loco.png",
      videoUrl: "./assets/img/portfolio/project/el-pollo-loco-preview-video-1.mp4",
      cogwheelUrl: "./assets/img/portfolio/project/cogwheel-180.svg",
      learning: "main-page.portfolio.project.learning-el-pollo-loco",
      emojiUrl: "./assets/img/icons/project/emoji-chick.svg",
      usedSkills: "JavaScript | HTML | CSS",
      description: "main-page.portfolio.project.description-el-pollo-loco",
      gitHubUrl: "https://github.com/SimCommit/el-pollo-loco",
      projectUrl: "https://el-pollo-loco.simon-fuchs.net/",
    },
    {
      name: "Pokédex",
      backgroundColor: "#FF834F",
      learningBgColor: "#679AAC",
      // videoUrl: "./assets/img/portfolio/project/pokedex-preview-2.png",
      videoUrl: "./assets/img/portfolio/project/pokedex-preview-video-5.mp4",
      cogwheelUrl: "./assets/img/portfolio/project/cogwheel-180-yellow.svg",
      learning: "main-page.portfolio.project.learning-pokedex",
      emojiUrl: "./assets/img/icons/project/pokeball.svg",
      usedSkills: "JavaScript | CSS | HTML | REST API",
      description: "main-page.portfolio.project.description-pokedex",
      gitHubUrl: "https://github.com/SimCommit/pokedex",
      projectUrl: "https://pokedex.simon-fuchs.net/",
    },
  ];

  currentProject: number = 0;

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
  name: string;
  backgroundColor: string;
  learningBgColor: string;
  videoUrl: string;
  cogwheelUrl: string;
  learning: string;
  emojiUrl: string;
  usedSkills: string;
  description: string;
  gitHubUrl: string;
  projectUrl: string;
}
