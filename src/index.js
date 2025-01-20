import { showProjects, showToDos} from "./domManip";
import { Project } from "./projects";
import { ProjectManager } from "./projects";

const projectManager = ProjectManager();
console.log(projectManager.getProjects());

projectManager.createProject('Dog Related Stuff')
const dog = projectManager.getProjectByName('dog-related-stuff')
dog.addToDoInProject('Clean Dog', 'with soap', 'now', 'low')
console.log(dog.showToDoInProject())
showProjects();
showToDos(dog);
