import { checkListDiv, modal, overlay, modal_inner } from "./elements";
import plusBoxImg from "../logos/plus-box-multiple.svg";
import editImg from "../logos/pencil-box.svg";
import deleteImg from "../logos/trash-can.svg";

export const displayCheckListFunc = (projectInstance, checkListInstance, toDoIndex, projectPosition) => {
    checkListDiv.textContent = '';
    const addCheckBoxIcon = document.createElement('img');
    addCheckBoxIcon.classList.add('logos', 'addIcon');
    addCheckBoxIcon.src = plusBoxImg;

    const actionTitle = document.createElement('h1');
    actionTitle.className = 'actionTitle'
    actionTitle.textContent = 'Action List!'

    checkListDiv.appendChild(actionTitle);
    checkListDiv.appendChild(addCheckBoxIcon);

    addCheckBoxIcon.addEventListener('click', () => {
        checkListFormModal();
    })

    const displayCheckList = () => {
        const toDo = projectInstance.getToDoArr(projectPosition)
        const checkListArr = toDo[toDoIndex].checkList;

        for (let i in checkListArr) {
            const checkListWrapper = document.createElement('div')
            checkListWrapper.classList.add('checkListWrapper');

            const input = document.createElement('input');
            input.classList.add('checkBox');
            input.type = 'checkbox';
            input.checked = checkListArr[i].done;
            input.classList.add(checkListArr[i].done.toString());

            input.addEventListener('click', () => {
                console.log('hey your clicking me!')
                checkListInstance.toggleCheckBox(toDoIndex, projectPosition, i)
                input.classList.toggle(checkListArr[i].done.toString());
                displayCheckListFunc(projectInstance, checkListInstance, toDoIndex, projectPosition);
            })
            const label = document.createElement('label')
            label.textContent = `#${parseInt(i) + 1}. ${checkListArr[i].action}`;

            co
