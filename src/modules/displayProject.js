import { ProjectFunc } from "./project";
import { ToDoFunc } from "./todo";


//testing data will be named Default Project
const instanceOfProjects = ProjectFunc();

export const ProjectDisplayFunc = () => {  
    
    //test
    if (instanceOfProjects.getProjectArr().length === 0) {
        instanceOfProjects.addProjectToProjectArr('Code Javascript', 'Im Cool')
        instanceOfProjects.addProjectToProjectArr('Crying Session', 'Im Sad')
        instanceOfProjects.addProjectToProjectArr('Play RoadBlox', 'iloveroblox')
        instanceOfProjects.addProjectToProjectArr('Feed Cat', 'cat is hungry');
    }
    const projects = instanceOfProjects.getProjectArr();
    console.log(instanceOfProjects.getProjectArr()); 
    //use
    const container = document.querySelector('.container');
    container.textContent = '';

    const title = document.querySelector('.title');
    const paragraphTitle = document.createElement('h1');
    paragraphTitle.textContent = 'Projects';

    title.appendChild(paragraphTitle)

    projects.forEach((project, projectIndex) => {
        const projectTitle = document.createElement('h1')
        projectTitle.textContent = `${projectIndex}: ${project.name}`

        container.appendChild(projectTitle);
    });

    const createProjectHandler = () => {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');

        const createProjectButton = document.createElement('button');
        createProjectButton.textContent = 'Create Project';
        buttonDiv.appendChild(createProjectButton);
        container.appendChild(buttonDiv);
    };

    createProjectHandler();


}

 