import { ProjectFunc } from "./project";
import { ToDoFunc } from "./todo";


//testing data will be named Default Project


export const ProjectDisplayFunc = () => {  

    const instanceOfProjects = ProjectFunc();
    //use
    const container = document.querySelector('.container');
    container.textContent = '';
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

    const cards = document.createElement('div')
    cards.classList.add('cards');
    cards.textContent = 'STORE PROJECTS'
    container.appendChild(cards);

    const projectModal = document.createElement('dialog');
    projectModal.id = 'projectModal';
    container.appendChild(projectModal);

    console.log("instanceOfProjects:", instanceOfProjects);
    const instanceOfTodos = ToDoFunc();
    
    const returnProjectDatas = () => {
        const projects = instanceOfProjects.getProjectArr();
        //noted for each project data create cards using project controller
        projects.map((project, index) => {
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

        const nameProject = document.createElement('div');
        nameProject.classList.add('nameProject');
        nameProject.textContent = name

        const descProject = document.createElement('div');
        descProject.classList.add('descProject');
        descProject.textContent = desc

        const toDoLists = document.createElement('div');
        toDoLists.classList.add("toDoLists")
        toDoLists.textContent = `Current Todos Available: ${noOfTodos}`;

        projectInfo.appendChild(nameProject);
        projectInfo.appendChild(descProject);
        projectInfo.appendChild(toDoLists);
        //const optionButtons = document.createElement('div');
    }

    return { 
        returnProjectDatas
        };
}

 