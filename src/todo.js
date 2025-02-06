import {ProjectFunc} from "./project";

export const ToDoFunc = () => {

    const instanceOfProjects = ProjectFunc();

    const createToDo = (title, description, dueDate, priority) => {
        return {title, description, dueDate, priority};
    }

    const insertToDoToProject = (projectPosition, title, description, dueDate, priority) => {
        const addedToDo = createToDo(title, description, dueDate, priority);

        instanceOfProjects.getProjectArr()[projectPosition].toDoList.push(addedToDo)
        instanceOfProjects.saveProjectLocally()
    }
    //array.splice(startIndex, deleteCount, ...itemsToAdd) syntax

    const updateToDo = (projectPosition, toDoPosition, title, description, dueDate, priority) => {
        instanceOfProjects.getProjectArr()[projectPosition].toDoList.splice(toDoPosition, 1, {projectPosition, toDoPosition, title, description, dueDate, priority});
        instanceOfProjects.saveProjectLocally();
    }
    const removeToDo = (projectPosition, toDoPosition) => {
        instanceOfProjects.getProjectArr()[projectPosition].toDoList.splice(toDoPosition, 1);
        instanceOfProjects.saveProjectLocally();
    }
    //select specific to do list based on projectPosition
    const selectToDo = (projectPosition) => {
        //remember the project array
        instanceOfProjects.restoreProjectLocally();
        try {
            return instanceOfProjects.getProjectArr()[projectPosition].toDoList;
        }
        catch (err) {
            console.log("It seems I am not able to select this to do 'trying again'");
        }
    }

    return {
        insertToDoToProject,
        updateToDo,
        removeToDo,
        selectToDo
    };
}

