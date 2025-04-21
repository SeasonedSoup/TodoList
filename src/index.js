import "./reset.css";
import "./styles.css";
import {ToDoFunc} from "./modules/todo";
import { ProjectFunc } from "./modules/project";
import { checkListFunc } from "./modules/checkList";
import { DisplayProjectFunc } from "./modules/displayProject";
import { DisplayToDoFunc } from "./modules/displayTodos";
import { quoteSwitching } from "./modules/quoteTransition";

import toggleImg from "./logos/theme-light-dark.svg"
let isItDark =  JSON.parse(localStorage.getItem('darkMode')) || false;

(function loadDark() {
    if (isItDark) {
        document.body.classList.toggle('dark')
    }
})();

//=====epock dark mode button
function darkMode() {
    document.body.classList.toggle('dark')
    isItDark = document.body.classList.contains('dark')
    localStorage.setItem('darkMode', JSON.stringify(isItDark))
}

const darkModeLogo = document.querySelector('.toggle');
darkModeLogo.src = toggleImg;
darkModeLogo.addEventListener('click', darkMode);

//========Functionality
const projectInstance = ProjectFunc();

const toDoInstance = ToDoFunc(projectInstance);

const checkListInstance = checkListFunc(projectInstance);
console.log(checkListInstance);
DisplayProjectFunc(projectInstance, toDoInstance, DisplayToDoFunc);
DisplayToDoFunc(0, toDoInstance, projectInstance, checkListInstance);

const {nextQuote, prevQuote} = quoteSwitching();

const prevButton = document.querySelector('.prev');

const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', prevQuote)

nextButton.addEventListener("click", nextQuote)
                