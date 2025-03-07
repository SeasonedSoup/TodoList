export const ProjectFunc = () => {
  let projectArr = [];
  //this is an array we push on todo.js once we add a to do on a project
  const createProject = (name = "Default Project", toDoList = []) => {
    return { name, toDoList }; //object
  };

  const addProjectToProjectArr = (name = "Default Project", toDoList = []) => {
    const addedProject = createProject(name, toDoList);
    projectArr.push(addedProject);
    saveProjectLocally();
  };

  const updateProject = (projectPosition, name, toDoList) => {
    projectArr.splice(projectPosition, 1, { name, toDoList });
    saveProjectLocally();
  };

  const deleteProject = (projectPosition) => {
    projectArr.splice(projectPosition, 1);
    saveProjectLocally();
  };

  const saveProjectLocally = () => {
    localStorage.setItem("Project", JSON.stringify(getProjectArr()));
  };

  const restoreProjectLocally = () => {
    const savedData = localStorage.getItem("Project");
    if (savedData && projectArr.length === 0) {
      projectArr = JSON.parse(savedData);
    }
  };

  const resetProjectLocally = () => {
    localStorage.clear();
  };

  const getProjectArr = () => projectArr;

  const getToDoArr = (projectPosition) => {
    if (projectArr[projectPosition]) {
      return projectArr[projectPosition].toDoList;
    }
    return [];
  };
  restoreProjectLocally();

  return {
    createProject,
    addProjectToProjectArr,
    getProjectArr,
    getToDoArr,
    updateProject,
    deleteProject,
    saveProjectLocally,
    restoreProjectLocally,
    resetProjectLocally,
  };
};
