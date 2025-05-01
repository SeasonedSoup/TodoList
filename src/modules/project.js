export const ProjectFunc = () => {
  let projectArr = [];

  const getProjectArr = () => projectArr;

  const getFinishList = (projectPosition) => {
    return projectArr[projectPosition].finishList;
  }
  //this is an array we push on todo.js once we add a to do on a project
  const createProject = (name = "Default Project", toDoList = [], finishList = []) => {
    return { name, toDoList, finishList }; //object
  };

  const addProjectToProjectArr = (name = "Default Project", toDoList = [], finishList = []) => {
    const addedProject = createProject(name, toDoList, finishList);
    projectArr.push(addedProject);
    saveProjectLocally();
  };

  const updateProject = (projectPosition, name, toDoList, finishList) => {
    projectArr.splice(projectPosition, 1, { name, toDoList, finishList });
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

  const getToDoArr = (projectPosition) => {
    if (projectArr[projectPosition]) {
      saveProjectLocally();
      return projectArr[projectPosition].toDoList;
    }
  };

  const getCheckListArr = (projectPosition, toDoIndex) => {
    if(projectArr[projectPosition]) {
     const toDoList = projectArr[projectPosition].toDoList;
     return toDoList[toDoIndex].checkList
    }
  }

  let sorted = false; // Default sorting state

  const sortToDoArr = (projectPosition) => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    
    let toDoLists = getToDoArr(projectPosition);
    if (toDoLists.length === 0 || toDoLists.length === 1) {
      alert('Cannot be Sorted there is only one or an empty to do array element');
      return;
    }
    sorted = !sorted;

    toDoLists = toDoLists.sort((toDo1, toDo2) => {
      return sorted ? priorityOrder[toDo2.priority] - priorityOrder[toDo1.priority] : priorityOrder[toDo1.priority] - priorityOrder[toDo2.priority]; 
    });
    saveProjectLocally();
    return toDoLists;
    
  };
  restoreProjectLocally();  

  return {
    getFinishList,
    createProject,
    addProjectToProjectArr,
    getProjectArr,
    getToDoArr,
    getCheckListArr,
    sortToDoArr,
    updateProject,
    deleteProject,
    saveProjectLocally,
    restoreProjectLocally,
    resetProjectLocally,
  };
};
