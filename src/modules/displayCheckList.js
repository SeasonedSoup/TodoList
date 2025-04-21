
import { checkListDiv, modal, overlay, modal_inner } from "./elements";
import plusBoxImg from "../logos/plus-box-multiple.svg";

export const displayCheckListFunc = (projectInstance, checkListInstance, toDoIndex, projectPosition) => {
    console.log(projectInstance);
    checkListDiv.textContent = '';
    console.log(checkListInstance);
    const addCheckBoxIcon = document.createElement('img');
    addCheckBoxIcon.classList.add('logos');
    addCheckBoxIcon.src = plusBoxImg;

    checkListDiv.appendChild(addCheckBoxIcon);

    addCheckBoxIcon.addEventListener('click', () => {
        checkListFormModal();
    })
    
    
    const displayCheckList = () => {
        const toDo = projectInstance.getToDoArr(projectPosition)
        console.log(toDo);
        const checkListArr = toDo[projectPosition].checkList;
        console.log(checkListArr);

        for(let i in checkListArr) {
            const label = document.createElement('label')
            label.textContent = checkListArr[i].action;

            checkListDiv.appendChild(label);
        }
    }

    displayCheckList();













    const checkListFormModal = () => {
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

        input.setAttribute("autocomplete", "off");

        form.appendChild(label);
        form.appendChild(input);

        formWrapper.appendChild(form);

        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonCheckListForm')
    
        const submitButton = document.createElement("button");
        submitButton.classList.add('submitButton')
        submitButton.type = "submit";
        submitButton.textContent = "Create Project";
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

            checkListInstance.insertCheckBoxtoArr(toDoIndex, projectPosition, submittedAction);
            form.remove();
            modal.classList.remove("open");
            overlay.classList.remove("open");
            displayCheckListFunc(projectInstance, checkListInstance, toDoIndex, projectPosition);
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