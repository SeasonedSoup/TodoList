export default ProjectManager;

const ProjectManager = () => {
    const projectArr = [];
                                                            //this is an array we push on todo.js once we add a to do on a project
    const createProject = (name = 'Default Project', desc, toDoList) => {
        return {name, desc, todoList};
    }
    
    const addProjectToProjectArr = (name = 'Default Project', desc, toDoList) => {
        const addedProject = createProject(name = 'Default Project', desc, todoList) 
        projectArr.push(addedProject);
    }

    const getProjectArr = () => projectArr;

    
    return {
        createProject,
        addProjectToProjectArr,
        getProjectArr
    };
}
