import { ToDoItem } from "./ToDoClass"

export class Project {
    constructor(name) {
        this.name = name.trim().replace(/\s+/g, '-').toLowerCase()
        this.toDoItems = []
    }

    addToDoInProject = (title, description, dueDate, priority) => {
    const toDoItem = new ToDoItem(title, description, dueDate, priority)
    this.toDoItems.push(toDoItem)
    }

    removeToDoInProject = (index) => {
        this.toDoItems.splice(index, 1)
    }
    //show the todos in the project
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
        const cleanName = name.trim().replace(/\s+/g, '-').toLowerCase(); //help from ai
        const project = new Project(cleanName)
        projects.push(project)
    }
    const defaultProject = () => {
        createProject('Default Project')
    }

    const getProjectByName = (name) => {
        const cleanName = name.trim().replace(/\s+/g, '-').toLowerCase();
        return projects.find(project => project.returnName() === cleanName);
    }

    defaultProject();
}