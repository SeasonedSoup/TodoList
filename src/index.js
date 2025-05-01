import "./reset.css";
import "./styles.css";
import {ToDoFunc} from "./modules/todo";
import { ProjectFunc } from "./modules/project";
import { checkListFunc } from "./modules/checkList";
import { DisplayProjectFunc } from "./modules/displayProject";
import { DisplayToDoFunc } from "./modules/displayTodos";
import { quoteSwitching } from "./modules/quoteTransition";

import toggleImg from "./logos/theme-light-dark.svg"

 
const toDoContainer = document.querySelector('.toDoContainer');
console.log(toDoContainer);

let isItDark =  JSON.parse(localStorage.getItem('darkMode')) || false;
console.log('hi'); 
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
document.addEventListener('DOMContentLoaded', () => {
    const projectInstance = ProjectFunc();

    const toDoInstance = ToDoFunc(projectInstance);

    const checkListInstance = checkListFunc(projectInstance);
    console.log(checkListInstance);
    DisplayProjectFunc(projectInstance, toDoInstance, checkListInstance, DisplayToDoFunc);
    DisplayToDoFunc(0, toDoInstance, projectInstance, checkListInstance);
});

const {nextQuote, prevQuote} = quoteSwitching();

const prevButton = document.querySelector('.prev');

const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', prevQuote)

nextButton.addEventListener("click", nextQuote)
                