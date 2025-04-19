export const ToDoFunc = (projectInstance) => {

  let checkListArr = []

  const createToDo = (title, description, dueDate, priority) => {
    return { title, description, dueDate: dueDate || "No Due Date", priority };
  };

  const insertToDoToProject = (
    projectPosition,
    title,
    description,
    dueDate,
    priority
  ) => {
    const addedToDo = createToDo(title, description, dueDate, priority);

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
    priority
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
    });
    projectInstance.saveProjectLocally();
  };
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
  
  const selectToDo = (projectPosition) => {
    try {
      return projectInstance.getProjectArr()[projectPosition].toDoList;
    } catch (err) {
      console.log("It seems I am not able to select this to do 'trying again'");
    }
  };
  

  return {
    insertToDoToProject,
    updateToDo,
    removeToDo,
    selectToDo,
  };
};
