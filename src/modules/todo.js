export const ToDoFunc = (projectInstance) => {

  const createToDo = (title, description, dueDate, priority, pinned = false,checkList = []) => {
    return { title, description, dueDate: dueDate || "No Due Date", priority, pinned, checkList};
  };

  const insertToDoToProject = (
    projectPosition,
    title,
    description,
    dueDate,
    priority,
    pinned = false,
    checkList = []
  ) => {
    const addedToDo = createToDo(title, description, dueDate, priority, pinned, checkList);
    const projects = projectInstance.getProjectArr();
    if (!projects[projectPosition]) {
      console.log("Project does not exist in project position");
      return;
    }

    projects[projectPosition].toDoList.push(addedToDo);
    console.log(projects[projectPosition]);
    projectInstance.saveProjectLocally();
  };
  //array.splice(startIndex, deleteCount, ...itemsToAdd) syntax

  const updateToDo = (
    projectPosition,
    toDoPosition,
    title,
    description,
    dueDate,
    priority,
    pinned,
    checkList
  ) => {
    dueDate = dueDate || "No Due Date";
    const projects = projectInstance.getProjectArr();
    if (
      !projects[projectPosition] ||
      !projects[projectPosition].toDoList[toDoPosition]
    ) {
      console.error("Invalid project or ToDo position.");
      return;
    }
    projects[projectPosition].toDoList.splice(toDoPosition, 1, {
      title,
      description,
      dueDate,
      priority,
      pinned,
      checkList
    });
    projectInstance.saveProjectLocally();
  };

  const finishToDo = (projectPosition, toDoIndex, title, description, dueDate, priority, pinned, checkList) => {
    const projects = projectInstance.getProjectArr();
    
    if(!projects[projectPosition]) {
      return;
    }
    const addedToDo = createToDo(title, description, dueDate, priority, pinned, checkList);
    projects[projectPosition].finishList.push(addedToDo);
    projectInstance.getProjectArr()[projectPosition].toDoList.splice(toDoIndex, 1);

    projectInstance.saveProjectLocally();
  }

  const reAddToDo = (projectPosition, toDoIndex, title, description, dueDate, priority, pinned, checkList) => {
    const projects = projectInstance.getProjectArr();

    if(!projects[projectPosition]) {
      return;
    }
    const addedToDo = createToDo(title, description, dueDate, priority, pinned, checkList);
    projects[projectPosition].toDoList.push(addedToDo);
    projectInstance.getProjectArr()[projectPosition].finishList.splice(toDoIndex, 1);

    projectInstance.saveProjectLocally();
  }
  const removeToDo = (projectPosition, toDoPosition) => {
    const projects = projectInstance.getProjectArr();
    if (
      !projects[projectPosition] ||
      !projects[projectPosition].toDoList[toDoPosition]
    ) {
      console.error("Invalid project or ToDo position.");
      return;
    }
    projectInstance
      .getProjectArr()[projectPosition].toDoList.splice(toDoPosition, 1);
    projectInstance.saveProjectLocally();
  };
  
  const selectToDo = (projectPosition, toDoIndex) => {
    try {
      return projectInstance.getProjectArr()[projectPosition].toDoList[toDoIndex];
    } catch (err) {
      console.log("It seems I am not able to select this to do 'trying again'");
    }
  };

  const togglePin = (projectPosition, toDoIndex) => {
    const pin = selectToDo(projectPosition, toDoIndex)
    pin.pinned = !pin.pinned;

    projectInstance.saveProjectLocally();
  }
  return {
    insertToDoToProject,
    updateToDo,
    finishToDo,
    reAddToDo,
    removeToDo,
    selectToDo,
    togglePin
  };
};
