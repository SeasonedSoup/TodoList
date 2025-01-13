import { ToDoItem } from "./ToDoClass"

class Projects {
    constructor(name) {
        this.name = name
        this.toDoItems = []
    }

    addtoDoToProject = (title, description, dueDate, priority) => {
    const toDoItem = new ToDoItem(title, description, dueDate, priority)
    this.toDoItems.push(toDoItem)
    }
}

//initial idea a class that stores the projects and manage which project should a to do list go, creating new projects etc.
myProjects = []