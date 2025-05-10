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
  //default sorted by ascending order 

  let ascSorted = false;
  const prioMap = {low : 1, medium: 2, high: 3}; 
  
  const defaultSort = (projectPosition) => {
    let toDoList = getToDoArr(projectPosition) 
    if(ascSorted) {
      toDoList = toDoList.sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return b.pinned - a.pinned
        }
  
        return prioMap[a.priority] - prioMap[b.priority]
      })
    } else {
      toDoList = toDoList.sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return b.pinned - a.pinned
        }
  
        return prioMap[b.priority] - prioMap[a.priority]
      })
    }
  
    saveProjectLocally();

    return toDoList
  } 

  const sortToDoArr = (projectPosition) => { 
    let toDoList = getToDoArr(projectPosition);
    if (toDoList.length === 0 || toDoList.length === 1) {
      alert('Cannot be Sorted there is only one or an empty to do array element');
      return;
    }
    
    ascSorted = !ascSorted

    toDoList = toDoList.sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return b.pinned - a.pinned;
      }

      return ascSorted
      ? prioMap[a.priority]  - prioMap[b.priority]
      : prioMap[b.priority]  - prioMap[a.priority]
    });
    saveProjectLocally();
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
    defaultSort,
    sortToDoArr,
    updateProject,
    deleteProject,
    saveProjectLocally,
    restoreProjectLocally,
    resetProjectLocally,
  };
};
