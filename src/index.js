import "./reset.css";
import "./styles.css";
import {ToDoFunc} from "./modules/todo";
import { ProjectFunc } from "./modules/project";
import { checkListFunc } from "./modules/checkList";
import { DisplayProjectFunc } from "./modules/displayProject";
import { DisplayToDoFunc } from "./modules/displayTodos";
import { quoteSwitching } from "./modules/quoteTransition";
import toggleImg from "./logos/theme-light-dark.svg"

//========Functionality
document.addEventListener('DOMContentLoaded', () => {
    const projectInstance = ProjectFunc();

    const toDoInstance = ToDoFunc(projectInstance);

    const checkListInstance = checkListFunc(projectInstance);
    console.log(checkListInstance);
    DisplayProjectFunc(projectInstance, toDoInstance, checkListInstance);
    DisplayToDoFunc(0, toDoInstance, projectInstance, checkListInstance);
});
//======

//=====Extras 
darkModeLogic();
quoteLogic();
//======


//utilizes css style logic
function darkModeLogic() {
    let isItDark =  JSON.parse(localStorage.getItem('darkMode')) || false;
    //iife
    (function loadDark() {
        if (isItDark) {
            document.body.classList.toggle('dark')
        }
    })();


    function darkMode() {
        document.body.classList.toggle('dark');
        isItDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', JSON.stringify(isItDark));
    }

    const darkModeLogo = document.querySelector('.toggle');
    darkModeLogo.src = toggleImg;
    darkModeLogo.addEventListener('click', darkMode);
}

//quote from quoteTransition.js
function quoteLogic() {
    const {nextQuote, prevQuote} = quoteSwitching();

    const prevButton = document.querySelector('.prev');

    const nextButton = document.querySelector('.next');

    prevButton.addEventListener('click', prevQuote)

    nextButton.addEventListener("click", nextQuote)
}