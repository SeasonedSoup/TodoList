import {ProjectFunc} from "./project";

export const ToDoFunc = () => {

    const instanceOfProjects = ProjectFunc();

    toDoArr = [];

    const createToDo = (title, description, dueDate, priority) => {
        return {title, description, dueDate, priority};
    }

    const insertToDoToProject = (projectPosition, title, description, dueDate, priority) => {
        const addedToDo = createToDo(title, description, dueDate, priority);

        instanceOfProjects.getProjectArr()[projectPosition].toDoList.push(addedToDo)
    }

    return {
        createToDo,
        insertToDoToProject
    };
}

