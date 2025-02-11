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
    }
    const projects = instanceOfProjects.getProjectArr();
    console.log(instanceOfProjects.getProjectArr()); 
    //use
    const container = document.querySelector('.container');
    container.textContent = '';

    projects.forEach((project, projectIndex) => {
        const projectTitle = document.createElement('h1')
        projectTitle.textContent = `${projectIndex}: ${project.name}`

        container.appendChild(projectTitle);
    });
    const title = document.querySelector('.title');
    title.textContent = '';
   
    //just title
    const paragraphTitle = document.createElement('p');
    paragraphTitle.textContent = 'Projects';

    title.appendChild(paragraphTitle);
    //button for creating projects
    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList = 'newProjectBtn';
    newProjectBtn.textContent = 'New';

    const buttonContainer = document.createElement('div');
    buttonContainer.classList = 'buttonContainer';

    buttonContainer.appendChild(newProjectBtn);
    container.appendChild(buttonContainer);

    //div cards for projects 

    const cards = document.createElement('div');
    cards.classList.add('cards');
    container.appendChild(cards);

    const projectModal = document.createElement('dialog');
    projectModal.id = 'projectModal';
    container.appendChild(projectModal);

    console.log("instanceOfProjects:", instanceOfProjects);
    const instanceOfTodos = ToDoFunc();
    
    const returnProjectDatas = () => {
        cards.textContent = '';
        const projects = instanceOfProjects.getProjectArr();
        //noted for each project data create cards using project controller
        projects.forEach((project, index) => {
            let name = project.name;
            let desc = project.desc;
            let toDoList = project.todos
            let noOfTodos = toDoList.length();
            let positionProject = index;
            ProjectController(name, desc, noOfTodos, positionProject);
        })
    }
    
    const ProjectController = (name, desc, noOfTodos, positionProject) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add("projectCard");
        projectCard.textContent = "Project Card";
        cards.appendChild(projectCard);
        
        //div information of each projects
        const projectInfo = document.createElement('div');
        projectInfo.classList.add("projectInfo");

        const nameProject = document.createElement('h3');
        nameProject.classList.add('nameProject');
        nameProject.textContent = name

        const descProject = document.createElement('p');
        descProject.classList.add('descProject');
        descProject.textContent = desc

        const toDoLists = document.createElement('p');
        toDoLists.classList.add("toDoLists")
        toDoLists.textContent = `Current Todos Available: ${noOfTodos}`;
        
        const optionButtons = document.createElement('div');
        optionButtons.classList.add('optionButtons')
        
        projectInfo.appendChild(nameProject);
        projectInfo.appendChild(descProject);
        projectInfo.appendChild(toDoLists);
        projectInfo.appendChild(optionButtons);

        //project option buttons

        const viewProjectBtn = document.createElement('button');
        viewProjectBtn.classList.add('viewProjectBtn');
        viewProjectBtn.textContent = 'View';
        
        const updateProjectBtn = document.createElement('button');
        updateProjectBtn.classList.add('updateProjectBtn');
        updateProjectBtn.textContent = 'Update';

        const deleteProjectBtn = document.createElement('button');
        deleteProjectBtn.classList.add('deleteProjectBtn');
        deleteProjectBtn.textContent = 'Delete';
        deleteProjectBtn.dataset.index = positionProject;

        //to be noted add addEventListeners to each button in the future
    }

    const ProjectModal = (name, desc, positionProject) => {
        
    }

    return { 
        returnProjectDatas
        };
}

 