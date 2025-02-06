import { ProjectFunc } from "./project";
import { ToDoFunc } from "./todo";


//testing data will be named Default Project


export const ProjectDisplayFunc = () => {  

    const instanceOfProjects = ProjectFunc();
    
    const container = document.querySelector(".container");
    container.textContent = '';
    const title = document.querySelector('.title');
    title.textContent = '';

    //Assign a name to the title
    const paragraphTitle = document.createElement('p');
    paragraphTitle.textContent = 'Projects';

    title.appendChild(paragraphTitle);

    //Button that creates a new project
    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList = "newProjectBtn";
    newProjectBtn.textContent = "New";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList = "buttonContainer";

    buttonContainer.appendChild(newProjectBtn);

    container.appendChild(buttonContainer);

    console.log("instanceOfProjects:", instanceOfProjects);
    const instanceOfTodos = ToDoFunc();
    
    const projectContainer = document.querySelector('.container');
    
    const projects = instanceOfProjects.getProjectArr();

    projects.forEach((project, index) => {
        //element
        let projectDiv = document.createElement('div');
        projectDiv.textContent =  project.name;
        //testing if this is a counter index.
        let positionDiv = document.createElement('div');
        positionDiv.textContent = `Position ${index}`;

        console.log(projectDiv);
        console.log(positionDiv);

        projectContainer.appendChild(projectDiv);
        projectContainer.appendChild(positionDiv);
    })
    
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

 