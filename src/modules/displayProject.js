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
        createProjectButton.addEventListener('click', () => {
            projectFormModal();
        });
        buttonDiv.appendChild(createProjectButton);
        container.appendChild(buttonDiv);
    };

    const projectFormModal = () => {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const form = document.createElement('form');
        form.classList.add('projectForm');

        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Title: ';
        nameLabel.setAttribute('for', 'username-input');

        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('name', 'username');
        nameInput.setAttribute('id', 'username-input');
        nameInput.setAttribute('placeholder', 'Enter Your Name');

        const descLabel = document.createElement('label');
        descLabel.textContent = 'Description: ';
        descLabel.setAttribute('for', 'projectDesc');       

        const descInput = document.createElement('input');
        descInput.type = 'text';
        descInput.name = 'projectDesc';
        descInput.id = 'projectDesc';
        form.appendChild(nameLabel)
        form.appendChild(nameInput)
        form.appendChild(descLabel);
        form.appendChild(descInput)

        modal.appendChild(form);
        container.appendChild(modal);
    }

    createProjectHandler();



}

 