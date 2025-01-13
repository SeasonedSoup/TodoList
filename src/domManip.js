//show projects and to dos in the website

import { ToDoItem } from "./ToDoClass";

export const showToDoItem = () => {
    const toDoItem = new ToDoItem("Feed Dog", "I need feed dog", "tommorow", "medium")
    const listDiv = document.querySelector('.todo-list')
    const h1 = document.createElement('h1')
    h1.textContent = toDoItem.title
    listDiv.appendChild(h1)
}  

