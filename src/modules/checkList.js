export const checkListFunc = (projectInstance) => {
    const createCheckBox = (checkBox, action) => {
        return {checkBox, action}
    }

    const insertCheckBoxtoArr = (toDoPosition, projectPosition, checkBox, action) => {
        const addedCheckBox = createCheckBox(checkBox, action)
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
    /*
    const toggleCheckBox

    const deleteCheckBox

    const editCheckBox
    */
   return {
        insertCheckBoxtoArr
    }
}