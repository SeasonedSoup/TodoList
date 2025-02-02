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
}