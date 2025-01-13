import { ToDoItem } from "./ToDoClass"

const myProjects = []

const addtoDoToProject = (title, description, dueDate, priority) => {
    const project = new ToDoItem(title, description, dueDate, priority)
    myProjects.push(project)
}