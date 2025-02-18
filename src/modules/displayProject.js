
import { ProjectFunc } from "./project";

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
        const existingForm = document.querySelector('.projectForm')
        const formContainer = document.querySelector('.form')
        if (existingForm) {
            console.log("There is currently a form pls fill it up before making another one");
            return;
        }
        //modal div
        //const modal =
        const form = document.createElement('form')
        form.classList.add('projectForm');
    
        const inputs = [
            { label: 'Project Name: ', type: 'text', name: 'projectName', id: 'projectName'},
            { label: 'Project Description: ', type: 'text', name: 'projectDesc', id: 'projectDesc' },
        ];

        inputs.forEach((inputData) => {
            const label = document.createElement('label');
            label.textContent = inputData.label;
            label.setAttribute('for', inputData.id);

            const input = document.createElement('input');
            input.setAttribute('type', inputData.type);
            input.setAttribute('id', inputData.id);
            input.setAttribute('name', inputData.name);

            input.required = true;

            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(document.createElement('br'));

            formContainer.appendChild(form)
        })

        //button for submitting data to be used for AddProjectToProjectArr() and closing the modal
        const submitButton = document.createElement('button');
        submitButton.tyoe = 'submit';
        submitButton.textContent = 'Create Project';
        form.appendChild(submitButton);

        //closebutton

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submittedName = document.querySelector('#projectName').value
            const submittedDesc = document.querySelector('#projectDesc').value
            instanceOfProjects.addProjectToProjectArr(submittedName, submittedDesc);
            form.reset();
            //function that called to show and append all projects for the new project made to show in the dom
            //showProjects();
        });

    }

    createProjectHandler();



}

 