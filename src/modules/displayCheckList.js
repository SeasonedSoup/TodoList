
import { checkListDiv, modal, overlay, modal_inner } from "./elements";
import plusBoxImg from "../logos/plus-box-multiple.svg";
import editImg from "../logos/pencil-box.svg";
import deleteImg from "../logos/trash-can.svg";

export const displayCheckListFunc = (projectInstance, checkListInstance, toDoIndex, projectPosition) => {
    console.log(projectInstance);
    console.log(checkListInstance);
    checkListDiv.textContent = '';
    const addCheckBoxIcon = document.createElement('img');
    addCheckBoxIcon.classList.add('logos', 'addIcon');
    addCheckBoxIcon.src = plusBoxImg;

    const actionTitle = document.createElement('h1');
    actionTitle.className = 'actionTitle'
    actionTitle.textContent = 'Action List! (recommend 3-5)'

    checkListDiv.appendChild(actionTitle);
    checkListDiv.appendChild(addCheckBoxIcon);

    addCheckBoxIcon.addEventListener('click', () => {
        checkListFormModal();
    })
    
    
    const displayCheckList = () => {
        const toDo = projectInstance.getToDoArr(projectPosition)
        const checkListArr = toDo[toDoIndex].checkList;

        for(let i in checkListArr) {

            const checkListWrapper = document.createElement('div')
            checkListWrapper.classList.add('checkListWrapper');

            const input = document.createElement('input');
            input.classList.add('checkBox');
            input.type =  'checkbox';
            input.checked = checkListArr[i].done;
            input.classList.add(checkListArr[i].done.toString());

            input.addEventListener('click', () => {
                console.log('hey your clicking me!')
                checkListInstance.toggleCheckBox(toDoIndex, projectPosition, i)
                input.classList.toggle(checkListArr[i].done.toString());
                displayCheckListFunc(projectInstance, checkListInstance, toDoIndex, projectPosition);
            })
            const label = document.createElement('label')
            label.textContent = checkListArr[i].action;

            const editIcon = document.createElement('img');
            editIcon.src = editImg;
            editIcon.classList.add('smallLogos');

            editIcon.addEventListener('click', () => {
                checkListFormModal(checkListArr[i], i);
            })

            const garbageIcon = document.createElement('img')
            garbageIcon.src = deleteImg;
            garbageIcon.classList.add('smallLogos')

            garbageIcon.addEventListener('click', () => {
                checkListInstance.deleteCheckBox(toDoIndex, projectPosition, i);
                displayCheckListFunc(projectInstance, checkListInstance, toDoIndex, projectPosition);
            })
            checkListWrapper.appendChild(input);
            checkListWrapper.appendChild(label);
            checkListWrapper.appendChild(editIcon);
            checkListWrapper.appendChild(garbageIcon);

            checkListDiv.appendChild(checkListWrapper);
        }
    }

    displayCheckList();

    const checkListFormModal = (checkList = null, checkListPosition = null) => {
        modal.classList.add("open");
        overlay.classList.add("open");

        const existingForm = document.querySelector('checkListForm');
        if (existingForm) {
            console.log(
              "There is currently a form pls fill it up before making another one",
            );
            return;
        }
        
        const form = document.createElement("form");
        form.classList.add("checkListForm");

        const formWrapper = document.querySelector(".form");

        const label = document.createElement('label');
        label.textContent = 'CheckList Action:'
        label.setAttribute('for', 'action')

        const input = document.createElement('input');
        input.type = 'text'
        input.id ='action';
        input.name = 'action';
        input.required = true;
        input.autofocus = false;
        input.minLength = 3;
        input.maxLength = 20;

        const value = checkList ? checkList.action : '';
        input.value = value;

        input.setAttribute("autocomplete", "off");

        form.appendChild(label);
        form.appendChild(input);

        formWrapper.appendChild(form);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonCheckListForm')
    
        const submitButton = document.createElement("button");
        submitButton.classList.add('submitButton')
        submitButton.type = "submit";
        submitButton.textContent = "Add Action";
        buttonDiv.appendChild(submitButton);
    
        const closeButton = document.createElement("button");
        closeButton.classList.add('closeButton')
        closeButton.type = "button";
        closeButton.textContent = "Close";
        buttonDiv.appendChild(closeButton);
        closeButton.addEventListener("click", () => {
          form.remove();
          modal.classList.remove("open");
          overlay.classList.remove("open");
        });
    
        form.appendChild(buttonDiv);
        modal_inner.appendChild(form);

        closeButton.addEventListener('click', () => {
            form.remove();
            modal.classList.remove("open");
            overlay.classList.remove("open");
        })

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const action = document.querySelector('#action');

            const submittedAction = action.value 
            if(!checkList) {
                checkListInstance.insertCheckBoxtoArr(toDoIndex, projectPosition, submittedAction);
                form.remove();
                modal.classList.remove("open");
                overlay.classList.remove("open");
                displayCheckListFunc(projectInstance, checkListInstance, toDoIndex, projectPosition);
            } else {
                checkListInstance.editCheckBox(toDoIndex, projectPosition, checkListPosition, submittedAction)
                form.remove();
                modal.classList.remove("open");
                overlay.classList.remove("open");
                displayCheckListFunc(projectInstance, checkListInstance, toDoIndex, projectPosition);
            }
           
        })
    }
}


   /* const checkListInput = document.createElement('input');
    checkListInput.type = 'checkbox'
    checkListInput.id = 'check'
    checkListInput.name = 'check'
    
    //this label will contain the  details of what its needed to be done
    const checkListLabel = document.createElement('label')
    checkListLabel.setAttribute('for', 'check');
    checkListLabel.textContent = 'CheckList under construction' */