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

    instanceOfTodos.insertToDoToProject(projectPosition, "Buy Groceries", "Milk, Eggs, Bread", "Tomorrow", "High");
    instanceOfTodos.insertToDoToProject(projectPosition, "Study JavaScript", "Review closures and promises", "Next Week", "Medium");
    instanceOfTodos.insertToDoToProject(projectPosition, "Workout", "Leg day at the gym", "Today", "Low");

    if (projectPosition === null || projectPosition === undefined) {
        toDoContainer.innerHTML = "<p>No project selected.</p>";
        return;
    }
}
