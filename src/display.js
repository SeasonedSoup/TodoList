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

    //div storage for projects 

    const storage = document.createElement('div')
    storage.classList.add('storage');
    storage.textContent = 'STORE PROJECTS'
    container.appendChild(storage);

    const projectModal = document.createElement('dialog');
    projectModal.id = 'projectModal';
    container.appendChild(projectModal);



    console.log("instanceOfProjects:", instanceOfProjects);
    const instanceOfTodos = ToDoFunc();
    
    //could be used to return data and give it to a controller?? to be noted
    const returnProjectDatas = () => {

        const projects = instanceOfProjects.getProjectArr();
    
        projects.map((project, index) => {
            let name = project.name;
            let desc = project.desc;
            let toDoList = project.todos
            let noOfTodos = toDoList.length();
            let positionProject = index;
            return {name, desc, toDoList, noOfTodos, positionProject};
        })
    }
    
    const ProjectController = ({name, desc, toDoList, noOfTodos, positionProject}) => {

    }

    return { 
        returnProjectDatas
        };
}

 