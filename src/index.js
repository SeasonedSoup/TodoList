import "./reset.css"
import "./styles.css";
import { ProjectDisplayFunc } from "./modules/displayProject";
import { toDoDisplayFunc } from "./modules/displayTodos";
import { quoteSwitching } from "./modules/quoteTransition";

console.log("helloWorld!");

ProjectDisplayFunc();
toDoDisplayFunc(0);

const {nextQuote, prevQuote} = quoteSwitching();

const prevButton = document.querySelector('.prev');

const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', prevQuote)

nextButton.addEventListener("click", nextQuote)
                