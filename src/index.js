//TO BE NOTED
// constructor(title, description, dueDate, priority = 'low', checklist = []
//const todo = new CreateToDoItem('Clean Dog', 'must be cleaned', 'now', 'low');
//const project = createProject()
import { ProjectDisplayFunc } from "./dom"
import { toDoDisplayFunc } from "./dom";
console.log("helloWorld!")

document.addEventListener('DOMContentLoaded', () => {
    ProjectDisplayFunc();
    toDoDisplayFunc(0);
})
