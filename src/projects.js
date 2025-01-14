import { ToDoItem } from "./ToDoClass"

class Project {
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
function ProjectManager() {
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

const dog = ProjectManager();