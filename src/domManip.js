//show projects and to dos in the website

import { Project } from "./projects";
import { ProjectManager } from "./projects";

export const showProjects = () => {
    const projectManager = ProjectManager();
    //test
    const projects = projectManager.getProjects();

    const projectDiv = document.querySelector('.projects-container')
    //clear
    projectDiv.innerHTML = ''

    projects.forEach((project) =>  {

        const projectElement = document.createElement('div')
        projectElement.classList.add('project')

        const projectTitle = document.createElement('h2')
        projectTitle.textContent = project.returnName();

        projectElement.appendChild(projectTitle);
        projectDiv.appendChild(projectElement)
    });
}

export const showToDos = (project) => {

    if (!(project instanceof Project)) {
        throw new Error('noob')
    }
    
    const toDosDiv = document.querySelector('.todos-container');

    toDosDiv.innerHTML = '';
    //display todos
    const toDos = project.showToDoInProject();
    //to be continued index will be like an id identifier
    //for each todo create a div that will contain certain details only atleast title and due date in the future
    toDos.forEach((toDo, index) => {
        const toDoDiv = document.createElement('div')
        toDoDiv.classList.add('to-do-details')
        //indexing has not yet been made for the project class when creating a todo i think
        toDoDiv.dataset.index = index

        const title = document.createElement(h3)
        title.textContent = toDo.title

        toDoDiv.appendChild(title);

        toDosDiv.appendChild(toDoDiv);

    })       
}



