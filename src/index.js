import "./reset.css"
import "./styles.css";
import {ToDoFunc} from "./modules/todo";
import { ProjectFunc } from "./modules/project";
import { DisplayProjectFunc } from "./modules/displayProject";
import { DisplayToDoFunc } from "./modules/displayTodos";
import { quoteSwitching } from "./modules/quoteTransition";

import toggleImg from "./logos/theme-light-dark.svg"

//=====epock dark mode button
function darkMode() {
    document.body.classList.toggle('dark')
}

const darkModeLogo = document.querySelector('.toggle');
darkModeLogo.src = toggleImg;
darkModeLogo.addEventListener('click', darkMode);

//========Functionality
const projectInstance = ProjectFunc();
console.log(projectInstance); 


const toDoInstance = ToDoFunc(projectInstance);
console.log(toDoInstance); 


DisplayProjectFunc(projectInstance, toDoInstance, DisplayToDoFunc);
DisplayToDoFunc(0, toDoInstance, projectInstance);

const {nextQuote, prevQuote} = quoteSwitching();

const prevButton = document.querySelector('.prev');

const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', prevQuote)

nextButton.addEventListener("click", nextQuote)
                