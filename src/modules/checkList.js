export const checkListFunc = (projectInstance) => {
    const createCheckBox = (action) => {
        return {action}
    }

    const insertCheckBoxtoArr = (toDoPosition, projectPosition, action) => {
        const addedCheckBox = createCheckBox(action)
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

    const deleteCheckBox = (toDoPosition, projectPosition) => {
        const projects = projectInstance.getProjectArr;
        const toDo = projects[projectPosition].toDoList[toDoPosition];

        if (!toDo || !projects){
            console.log('no existing todo position for that index')
            return;
        }

        toDo.checkList.splice(toDoPosition, 1)
        projectInstance.saveProjectLocally();
    }
    /*     
    
    const toggleCheckBox

    const editCheckBox
    */
   return {
        insertCheckBoxtoArr,
        deleteCheckBox
    }
}