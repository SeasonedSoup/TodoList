export const ProjectFunc = () => {
  let projectArr = [];

  const getProjectArr = () => projectArr;

  const getFinishList = (projectPosition) => {
    return projectArr[projectPosition].finishList;
  }

  const removeFinishList = (projectPosition) => {
    projectArr[projectPosition].finishList.length = 0;
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
  let sorted = false; 
  const sortToDoArr = (projectPosition) => {
    const priorityOrder = { low: 1, medium: 2, high: 3,  false: 0, true: 4};
    
    let toDoLists = getToDoArr(projectPosition);
    if (toDoLists.length === 0 || toDoLists.length === 1) {
      alert('Cannot be Sorted there is only one or an empty to do array element');
      return;
    }
    
    sorted = !sorted

    toDoLists = toDoLists.sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return b.pinned - a.pinned;
      }

      return sorted
      ? priorityOrder[b.priority]  - priorityOrder[a.priority]  
      : priorityOrder[a.priority]  - priorityOrder[b.priority]   
    });
    saveProjectLocally();
    return toDoLists;

  };
  restoreProjectLocally();  

  return {
    getFinishList,
    removeFinishList,
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
