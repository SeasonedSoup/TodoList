import CreateToDoItem from "./todo";
import createProject from "./project";
// constructor(title, description, dueDate, priority = 'low', checklist = []
const todo = new CreateToDoItem('Clean Dog', 'must be cleaned', 'now', 'low');
const project = createProject()
console.log(todo);
console.log(project);