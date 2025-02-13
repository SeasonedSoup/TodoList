import { ToDoFunc } from './todo';
import { ProjectFunc } from './project';

export const bugCheck = () => {
    const instanceOfTodos = ToDoFunc();
    console.log("Todos instance:", instanceOfTodos);
    
    const instanceOfProjectsFromTodo = ProjectFunc();
    console.log(instanceOfProjectsFromTodo.getProjectArr());
}
export const toDoDisplayFunc = (projectPosition) => {
    const instanceOfTodos = ToDoFunc();
    console.log("Todos instance:", instanceOfTodos);

    const instanceOfProjectsFromTodo = ProjectFunc();
    console.log(instanceOfProjectsFromTodo.getProjectArr());

    const toDoContainer = document.querySelector('.toDoContainer');
    toDoContainer.textContent = '';
    

    if (projectPosition === null || projectPosition === undefined) {
        toDoContainer.innerHTML = "<p>No project selected.</p>";
        return;
    }

    const todos = instanceOfTodos.selectToDo(projectPosition);
    const project = instanceOfProjectsFromTodo.getProjectArr()[projectPosition];
    console.log('HI Project:', project); // Debugging line
    const name = project.name ;

    if(!todos || todos.length === 0) {
        instanceOfTodos.insertToDoToProject(projectPosition, "Buy Groceries", "Milk, Eggs, Bread", "Tomorrow", "High");
        instanceOfTodos.insertToDoToProject(projectPosition, "Study JavaScript", "Review closures and promises", "Next Week", "Medium");
        instanceOfTodos.insertToDoToProject(projectPosition, "Workout", "Leg day at the gym", "Today", "Low");
    };
    
    const index = document.createElement('h1');
    index.textContent = `Project ${projectPosition}: ${name}`;
    toDoContainer.appendChild(index);
    todos.forEach((todo) => {
        const toDoTitle = document.createElement('h2');
        toDoTitle.textContent = todo.title;
        toDoContainer.appendChild(toDoTitle);
    });
}