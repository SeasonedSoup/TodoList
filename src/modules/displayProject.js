
import { ProjectFunc } from "./project";
import { toDoDisplayFunc } from "./displayTodos";

//testing data will be named Default Project
const instanceOfProjects = ProjectFunc();

export const ProjectDisplayFunc = () => {  
    
   
    const projects = instanceOfProjects.getProjectArr();
   
    console.log("Projects: " + instanceOfProjects.getProjectArr()); 
    //use
    const container = document.querySelector('.container');
    container.textContent = '';

    const createProjectHandler = () => {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');

        const createProjectButton = document.createElement('button');
        createProjectButton.classList.add('button')
        createProjectButton.textContent = 'Create Project';
        createProjectButton.addEventListener('click', () => {
            projectFormModal();
        });
        buttonDiv.appendChild(createProjectButton);
        container.appendChild(buttonDiv);
    };

    const removeProjectHandler = () => {

        const buttonDiv = document.createElement('div');

        const removeProjectDropdown = document.createElement('button');
        removeProjectDropdown.textContent = 'COG';
        
        const dropdown = document.createElement('select');
        dropdown.classList.add('dropdown', 'hidden');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Project'
        
        const populateDropdown = () => {
            dropdown.innerHTML = '';
        

            projects.forEach((project, projectIndex) => {
                const option = document.createElement('option');
                option.value = projectIndex;
                option.textContent = project.name;
                dropdown.appendChild(option);
            });
        
        }
    
        
        removeProjectDropdown.addEventListener('click', () => {
                populateDropdown();
        });

        deleteButton.addEventListener('click', () => {
             const selectedIndex = dropdown.value;
             if (selectedIndex !== '' && projects.length !== 1) {
                instanceOfProjects.deleteProject(selectedIndex);
                populateDropdown();
                ProjectDisplayFunc();
             }  else {
                console.log("CANT DELETE");
             }
        })

        buttonDiv.appendChild(removeProjectDropdown);
        buttonDiv.append(dropdown);
        buttonDiv.appendChild(deleteButton);
        container.appendChild(buttonDiv);
    };

    const title = document.querySelector('.title');
    title.classList.add('title')

    const paragraphTitle = document.createElement('h1');
    const oneTitleOnly = document.querySelector('.paraTitle');

    if(!oneTitleOnly) {
    paragraphTitle.classList.add('paraTitle');
    paragraphTitle.textContent = 'Projects';
    title.appendChild(paragraphTitle);
    }

    createProjectHandler();
    removeProjectHandler();


    projects.forEach((project, projectIndex) => {
        const projectTitle = document.createElement('h1')
        projectTitle.textContent = `${projectIndex + 1}: ${project.name} ${project.desc}`
        projectTitle.addEventListener('click', () => {
            toDoDisplayFunc(projectIndex);
        })
        //base idea probably need a controller way different function than this that will get the project array display the projects like a dropdown then selecting them will delete
        container.appendChild(projectTitle);
    });


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

        })

        //button for submitting data to be used for AddProjectToProjectArr() and closing the modal
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Create Project';
        form.appendChild(submitButton);

        //closebutton
        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.textContent = 'Close';
        form.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            form.remove()
        })

        formContainer.appendChild(form)

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submittedName = document.querySelector('#projectName').value
            const submittedDesc = document.querySelector('#projectDesc').value
            instanceOfProjects.addProjectToProjectArr(submittedName, submittedDesc);
            form.remove();
            ProjectDisplayFunc();
            //function that called to show and append all projects for the new project made to show in the dom
            //showProjects();
        });
        //hell yea
        const addEventListenersToYoProjects = () => {

        }
    }
}

 