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
    //array.splice(startIndex, deleteCount, ...itemsToAdd) syntax

    const updateToDo = (projectPosition, toDoPosition, title, description, dueDate, priority) => {
        instanceOfProjects.getProjectArr()[projectPosition].toDoList.splice(toDoPosition, 1, {projectPosition, toDoPosition, title, description, dueDate, priority});
    }
    const removeToDo = (projectPosition, toDoPosition) => {
        instanceOfProjects.getProjectArr()[projectPosition].toDoList.splice(toDoPosition, 1);
    }

    const selectToDo = (projectPosition) => {
        try {
            return instanceOfProjects.getProjectArr()[projectPosition].toDoList;
        }
        catch (err) {
            console.log("It seems I am not able to select this to do 'trying again'");
        }
    }

    return {
        createToDo,
        insertToDoToProject,
        updateToDo,
        removeToDo,
        selectToDo
    };
}

