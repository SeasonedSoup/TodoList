//show projects and to dos in the website

import { Project } from "./projects";
import { ProjectManager } from "./projects";

export const showProjects = () => {
    const projectManager = ProjectManager();
    //test
    projectManager.createProject('Project 1');
    projectManager.createProject('Project 2');

    console.log(projectManager.getProjects());

    const projects = projectManager.getProjects();

    const projectDiv = document.querySelector('.projects-container')
    //clear
    projectDiv.textContent = ''

    projects.forEach((project) =>  {

        const projectElement = document.createElement('div')
        projectElement.classList.add('project')

        const projectTitle = document.createElement('h2')
        projectTitle.textContent = project.returnName();

        projectElement.appendChild(projectTitle);
        projectDiv.appendChild(projectElement)
    });
}



