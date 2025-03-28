import "./reset.css"
import "./styles.css";
import {ToDoFunc} from "./modules/todo";
import { ProjectFunc } from "./modules/project";
import { ProjectDisplayFunc } from "./modules/displayProject";
import { toDoDisplayFunc } from "./modules/displayTodos";
import { quoteSwitching } from "./modules/quoteTransition";

const toDoInstance = ToDoFunc();
console.log(toDoInstance); 

const projectInstance = ProjectFunc();
console.log(projectInstance); 


ProjectDisplayFunc(projectInstance, toDoInstance, toDoDisplayFunc);
toDoDisplayFunc(0, toDoInstance, projectInstance);

const {nextQuote, prevQuote} = quoteSwitching();

const prevButton = document.querySelector('.prev');

const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', prevQuote)

nextButton.addEventListener("click", nextQuote)
                