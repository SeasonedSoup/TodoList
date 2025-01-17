import { ToDoItem } from "./ToDoClass"

export class Project {
    constructor(name) {
        this.name = name
        this.toDoItems = []
    }

    addToDoInProject = (title, description, dueDate, priority) => {
    const toDoItem = new ToDoItem(title, description, dueDate, priority)
    this.toDoItems.push(toDoItem)
    }

    removeToDoInProject = (index) => {
        this.toDoItems.splice(index, 1)
    }

    showToDoInProject = () => {
        return this.toDoItems
    }

    returnName = () => {
        return this.name
    }
}

//initial idea a class that stores the projects and manage which project should a to do list go, creating new projects etc.
export function ProjectManager() {
    const projects = []

    const getProjects = () => projects
    
    const createProject = (name) => {
        const project = new Project(name)
        projects.push(project)
    }
    const defaultProject = () => {
        createProject('Default Project')
    }

    defaultProject();

    return {createProject, getProjects}
}