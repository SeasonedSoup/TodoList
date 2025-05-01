export const checkListFunc = (projectInstance) => {
    const createCheckBox = (action, done = false) => {
        return {action, done}
    }

    const insertCheckBoxtoArr = (toDoPosition, projectPosition, action, done = false) => {
        const addedCheckBox = createCheckBox(action, done)
        const projects = projectInstance.getProjectArr();
        const toDo = projects[projectPosition].toDoList[toDoPosition]

        if (!toDo){
            console.log('no existing todo position for that index')
            return;
        }

        toDo.checkList.push(addedCheckBox);
        console.log(toDo);
        projectInstance.saveProjectLocally();
    } 

    const deleteCheckBox = (toDoPosition, projectPosition, checkListPosition) => {
        const projects = projectInstance.getProjectArr();
        const toDo = projects[projectPosition].toDoList[toDoPosition];

        if (!toDo || !projects){
            console.log('no existing todo position for that index')
            return;
        }

        toDo.checkList.splice(checkListPosition, 1)
        projectInstance.saveProjectLocally();
    }
    
    const toggleCheckBox = (toDoPosition, projectPosition, checkListPosition) => {
        const projects = projectInstance.getProjectArr();
        const toDo = projects[projectPosition].toDoList[toDoPosition];

        toDo.checkList[checkListPosition].done = !toDo.checkList[checkListPosition].done
        projectInstance.saveProjectLocally();
    }

    
    const editCheckBox = (toDoPosition, projectPosition, checkListPosition, action) => {
        const projects = projectInstance.getProjectArr();
        const toDo = projects[projectPosition].toDoList[toDoPosition];

        toDo.checkList[checkListPosition].action = action
        projectInstance.saveProjectLocally();
    }

   return {
        insertCheckBoxtoArr,
        deleteCheckBox,
        toggleCheckBox,
        editCheckBox
    }
}