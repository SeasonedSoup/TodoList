export const ProjectFunc = () => {
    const projectArr = [];
                                                            //this is an array we push on todo.js once we add a to do on a project
    const createProject = (name = 'Default Project', desc, toDoList) => {
        return {name, desc, toDoList};
    }
    
    const addProjectToProjectArr = (name = 'Default Project', desc = 'Welcome to your first project!', toDoList = []) => {
        const addedProject = createProject(name, desc, toDoList);
        projectArr.push(addedProject);
    }

    const updateProject = (projectPosition, name, desc, toDoList) => {
        projectArr.splice(projectPosition, 1, {name, desc, toDoList})
        
    }

    const deleteProject = (projectPosition) => {
        projectArr.splice(projectPosition, 1)
    }

    const saveProjectLocally = () => {
        localStorage.clear();
        localStorage.setItem('Project', JSON.stringify(getProjectArr()));
    }

    const restoreProjectLocally = () => {
        savedData = localStorage.getItem('Project');
        projectArr = savedData ? JSON.parse(savedData) : addProjectToProjectArr();
    }
    
    const getProjectArr = () => projectArr;

    getProjectArr();
    restoreProjectLocally();

    
    return {
        createProject,
        addProjectToProjectArr,
        getProjectArr,
        updateProject,
        deleteProject,
        saveProjectLocally,
        restoreProjectLocally
    };
}
