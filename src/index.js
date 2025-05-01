//styles
import "./reset.css";
import "./styles.css";
//img
import toggleImg from "./logos/theme-light-dark.svg";

//Modules
import { ToDoFunc } from "./modules/todo";
import { ProjectFunc } from "./modules/project";
import { checkListFunc } from "./modules/checkList";
import { DisplayProjectFunc } from "./modules/displayProject";
import { DisplayToDoFunc } from "./modules/displayTodos";
import { quoteSwitching } from "./modules/quoteTransition";

//======== Functionality ========
export const projectInstance = ProjectFunc();
const toDoInstance = ToDoFunc(projectInstance);
const checkListInstance = checkListFunc(projectInstance);
console.log(checkListInstance);

DisplayProjectFunc(projectInstance, toDoInstance, checkListInstance, DisplayToDoFunc);
DisplayToDoFunc(0, toDoInstance, projectInstance, checkListInstance);

//====== Extras =======
quoteSwitchLogic();
darkModeLogoLogic();

function quoteSwitchLogic() {
    const { nextQuote, prevQuote } = quoteSwitching();

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    prevButton.addEventListener('click', prevQuote);
    nextButton.addEventListener("click", nextQuote);
}

function darkModeLogoLogic() {
    let isItDark = JSON.parse(localStorage.getItem('darkMode')) || false;

    (function loadBackGround() {
        if (isItDark) {
            document.body.classList.toggle('dark');
        }
    })();

    const darkModeLogo = document.querySelector('.toggle');
    darkModeLogo.src = toggleImg;
    darkModeLogo.addEventListener('click', toggleDarkMode);

    function toggleDarkMode() {
        document.body.classList.toggle('dark');
        isItDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', JSON.stringify(isItDark));
    }
}