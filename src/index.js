//TO BE NOTED
// constructor(title, description, dueDate, priority = 'low', checklist = []
//const todo = new CreateToDoItem('Clean Dog', 'must be cleaned', 'now', 'low');
//const project = createProject()
import { ProjectDisplayFunc } from './modules/displayProject';
import { toDoDisplayFunc, bugCheck } from './modules/displayTodos';

console.log("helloWorld!")


ProjectDisplayFunc();
bugCheck();
toDoDisplayFunc(0);

