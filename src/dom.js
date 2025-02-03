import { ProjectFunc } from "./project";
import { ToDoFunc } from "./todo";


//testing data will be named Default Project


export const ProjectDisplayFunc = () => {  

    const instanceOfProjects = ProjectFunc();

    console.log("instanceOfProjects:", instanceOfProjects);
    const instanceOfTodos = ToDoFunc();
    //dummy data
    instanceOfProjects.addProjectToProjectArr("Project 1", "Coding related stuff", []);
    instanceOfProjects.addProjectToProjectArr("Project 2");
    instanceOfProjects.addProjectToProjectArr("Project 0.1")

    const projectContainer = document.querySelector('.container');
    
    const projects = instanceOfProjects.getProjectArr();

    projects.forEach((project, index) => {
        //element
        let projectDiv = document.createElement('div');
        projectDiv.textContent =  project.name;
        //testing if this is a counter index.
        let positionDiv = document.createElement('div');
        positionDiv.textContent = `Position ${index}`;

        projectContainer.appendChild(projectDiv);
        projectContainer.appendChild(positionDiv);
    })
    
    //could be used to return data and give it to a controller?? to be noted
    const returnProjectDatas = () => {

        const projects = instanceOfProjects.getProjectArr();
    
        projects.forEach((project, index) => {
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

 //next idea is show todos on each project maybe add a button or make the project text itself a button not sure how id do that but to be noted
//add a button or maybe default that shows display on a different container but it has to follow the proper projects toDoList
const toDoDisplayFunc = (projectPosition) => {
    
    const instanceOfProjects = ProjectFunc();
    const instanceOfTodos = ToDoFunc();

    const toDoContainer = document.querySelector('.toDoContainer');
    toDoContainer.textContent = '';

    const title = document.querySelector('.title');
    title.textContent = '';
    
    
    //instanceOfTodos.

    //ok so to display the todo the todo will be on a todoarray on todo.js the selectToDoFunction will play a part here

}