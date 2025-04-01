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
    localStorage.setItem("Projects", JSON.stringify(getProjectArr()));
  };

  const restoreProjectLocally = () => {
    projectArr = JSON.parse(localStorage.getItem("Projects")) || [];
  };

  const resetProjectLocally = () => {
    localStorage.clear();
  };

  const getProjectArr = () => projectArr;

  const getToDoArr = (projectPosition) => {
    if (projectArr[projectPosition]) {
      saveProjectLocally();
      return projectArr[projectPosition].toDoList;
    }
  };

  let sorted = false; // Default sorting state

  const sortToDoArr = (projectPosition) => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    let toDoLists = getToDoArr(projectPosition);

    sorted = !sorted;

    toDoLists = toDoLists.sort((toDo1, toDo2) => {
      return sorted ? priorityOrder[toDo2.priority] - priorityOrder[toDo1.priority] : priorityOrder[toDo1.priority] - priorityOrder[toDo2.priority]; 
    });
    saveProjectLocally();
    return toDoLists;
    
  };
  restoreProjectLocally();  

  return {
    createProject,
    addProjectToProjectArr,
    getProjectArr,
    getToDoArr,
    sortToDoArr,
    updateProject,
    deleteProject,
    saveProjectLocally,
    restoreProjectLocally,
    resetProjectLocally,
  };
};
