import { ProjectFunc } from "./project";
import { ToDoFunc } from "./todo";

const instanceOfProjects = ProjectFunc();

//testing data will be named Default Project
instanceOfProjects.createProject('Clean Dog') 


const ProjectDisplay = () => {  
    const projectContainer = document.querySelector('.container');
    
    const projects = instanceOfProjects.getProjectArr();

    projects.forEach()
    
    
    //const h1 = document.createElement('h1');

    
    

}