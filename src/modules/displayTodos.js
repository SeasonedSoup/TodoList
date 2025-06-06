import { parseISO, startOfToday, format, differenceInCalendarDays } from 'date-fns';
import sortImg from '../logos/sort.svg';
import {projectText, overlay, modal, modal_inner, checkListDiv} from './elements';
import { displayCheckListFunc } from './displayCheckList';
import deleteImg from "../logos/trash-can.svg";
import pinLogo from "../logos/pin.svg";
import pinnedImg from "../logos/icons8-pin-100.png"

//PPPP format
export const DisplayToDoFunc = (projectPosition, toDoInstance, projectInstance, checkListInstance) => {

  const content = document.querySelector('.content');
  content.classList.remove('content2')

  const containerSeparator = document.querySelector('.containerSeparator');
  console.log(containerSeparator);

  const toDoContainer = document.querySelector('.toDoContainer');
  console.log(toDoContainer);
  toDoContainer.textContent = '';  

  projectText.textContent = `${projectInstance.getProjectArr()[projectPosition].name} - ${projectInstance.getToDoArr(projectPosition).length} To Do's`;

  const toDoContainerTitle = document.querySelector('.toDoTitle');
  toDoContainerTitle.appendChild(projectText);

  createToDoHandler();
  sortToDoHandler();
  pinToDoHandler();

  const container = document.querySelector('.finishedContainer');

  if (container) {
    container.remove();
  }

  const finishedContainer = document.createElement('div');
  finishedContainer.classList.add('finishedContainer');
  projectInstance.defaultSort(projectPosition);
  viewTodos();


  function createToDoHandler() {
    const checkToDoButton = document.querySelector('.createToDoButton');

    if (checkToDoButton) {
      checkToDoButton.remove();
    }

    const createToDoButton = document.createElement('button');
    createToDoButton.textContent = 'Add To-Do +';
    createToDoButton.classList.add('createToDoButton');

    createToDoButton.addEventListener('click', () => {
      formModal(projectPosition);
    });

    toDoContainerTitle.appendChild(createToDoButton);
  };

  function sortToDoHandler() {
    const checkSortToDoButton = document.querySelector('.sortDiv');
    if (checkSortToDoButton) {
      checkSortToDoButton.remove();
    }
    const sortDiv = document.createElement('div');
    sortDiv.classList.add('sortDiv')
    const sortPara = document.createElement('p');
    sortPara.classList.add('sort');
    sortPara.textContent = 'Sort';

    const sortToDoButton = document.createElement('img');
    sortToDoButton.src = sortImg;
    sortToDoButton.classList.add('logos', 'sortToDoButton');
    
    sortToDoButton.addEventListener('click', () => {
      projectInstance.sortToDoArr(projectPosition);
      viewTodos(); // Call viewTodos to refresh the display with the sorted array
    });
    sortDiv.appendChild(sortPara);
    sortDiv.appendChild(sortToDoButton);
    toDoContainerTitle.appendChild(sortDiv);
  };

  function pinToDoHandler() {
    const checkPinToDoButton = document.querySelector('.pinDiv');
    if (checkPinToDoButton) {
      checkPinToDoButton.remove();
    }
    const pinDiv = document.createElement('div'); 
    pinDiv.classList.add('pinDiv');
    const pinPara = document.createElement('p');
    pinPara.classList.add('pin');
    pinPara.textContent = 'Pin/Unpin';
    
    const pinToDoButton = document.createElement('img');
    pinToDoButton.src = pinLogo;
    pinToDoButton.classList.add('logos', 'pinLogo')
    pinToDoButton.addEventListener('click', () => {
      const val = prompt('Select To Do Index to Pin / Unpin');
      const index = parseInt(val)
      if (isNaN(index) || typeof index !== 'number' || index >= projectInstance.getProjectArr()[projectPosition].toDoList.length || index < 0) {
        alert('Not A Valid Pin');
        return;
      }
      toDoInstance.togglePin(projectPosition, index)
      DisplayToDoFunc(projectPosition, toDoInstance, projectInstance, checkListInstance);
    }) 
    pinDiv.appendChild(pinPara);
    pinDiv.appendChild(pinToDoButton)
    toDoContainerTitle.appendChild(pinDiv);
  }

  function viewTodos() {
    toDoContainer.textContent = '';
    toDoContainer.classList.add('grid');
    const todos = projectInstance.getToDoArr(projectPosition) || [];

    finishedContainer.textContent = ''
    const finishedTodos = projectInstance.getFinishList(projectPosition)
    console.log(finishedTodos);
    if (todos.length === 0) {
      const p = document.createElement('p');
      p.className = 'emptyPara';
      p.textContent = 'Currently No To Dos Go Add a Few!';
      toDoContainer.appendChild(p);
    } 
    loadToDos();
    loadFinishedToDos();
    
    function loadToDos() {
      todos.forEach((todo, index) => {
        const toDoItem = document.createElement('div');
        toDoItem.classList.add('toDoItem');
  
        const toDoSquare = document.createElement('div');
        toDoSquare.classList.add('square');
        if (todo.priority === 'low') {
          toDoSquare.classList.add('low');
        } else if (todo.priority === 'medium') {
          toDoSquare.classList.add('medium');
        }
        
        if(todo.pinned === true) {
          toDoSquare.classList.add('pinned');
          const pinIndicator = document.createElement('img');
          pinIndicator.classList.add('pinIndicator');
          pinIndicator.src = pinnedImg;
          toDoSquare.appendChild(pinIndicator);
        }
      
        toDoSquare.addEventListener('click', () => {
          seeToDoDetails(todo, index, projectPosition);
        });
       
        const toDoIndexAndTitle = document.createElement('h2');
        toDoIndexAndTitle.className = 'toDoItem-title'
        toDoIndexAndTitle.textContent = `${todo.title}`;
        if (parseISO(todo.dueDate) < startOfToday()) {
          toDoIndexAndTitle.classList.add('expired')
          toDoIndexAndTitle.textContent = `${todo.title} !!!`
        }
        const toDoDueDate = document.createElement('h2');
        const calendarDaysDiff = differenceInCalendarDays(parseISO(todo.dueDate), startOfToday());

        if (calendarDaysDiff === 0) {
          toDoDueDate.textContent = 'Due Today'
        } else if (calendarDaysDiff === 1) {
          toDoDueDate.textContent = 'Due in 1 day'
        }
         else if (calendarDaysDiff > 0) {
          toDoDueDate.textContent = `Due in ${calendarDaysDiff} days`
        } else if (calendarDaysDiff < 0 ){
          toDoDueDate.textContent = `Overdue by ${Math.abs(calendarDaysDiff)} days`
        } else {
          toDoDueDate.textContent = 'No Due Date'
        }
    
        toDoItem.appendChild(toDoSquare);
        toDoItem.appendChild(toDoIndexAndTitle);
        toDoItem.appendChild(toDoDueDate);
  
        toDoContainer.appendChild(toDoItem);
      });
      containerSeparator.appendChild(toDoContainer);
    }
    function loadFinishedToDos() {
      if(finishedTodos.length === 0) {
        return;
      }
      
      const completedText = document.createElement('h2') 
      completedText.textContent = ' ✓ Completed (Click Todo to Re-add)';
      completedText.classList.add('completedText');

      const binDiv = document.createElement('div');
      binDiv.classList.add('bin')


      const deleteText = document.createElement('h1')
      deleteText.textContent = 'Clear Finished ToDos'
      deleteText.classList.add('deleteText')
      const deleteAll = document.createElement('img') 
      deleteAll.classList.add('logos')
      deleteAll.src = deleteImg;

      binDiv.appendChild(deleteAll);
      binDiv.appendChild(deleteText);
  
      finishedContainer.appendChild(completedText);
      finishedContainer.appendChild(binDiv);

      deleteAll.addEventListener('click', () => {
        projectInstance.removeFinishList(projectPosition);
        DisplayToDoFunc(projectPosition, toDoInstance, projectInstance, checkListInstance)
      })

      finishedTodos.forEach((finishedTodo, finishedIndex) => {
        const toDoItem = document.createElement('div');
        toDoItem.classList.add('toDoItem', 'finished');
  
        const toDoSquare = document.createElement('div');
        toDoSquare.classList.add('square');
        if (finishedTodo.priority === 'low') {
          toDoSquare.classList.add('low');
        } else if (finishedTodo.priority === 'medium') {
          toDoSquare.classList.add('medium');
        }

        toDoSquare.addEventListener('click', () => {
          finishedTodo.checkList.map(checkbox => checkbox.done = false);
          finishedTodo.dueDate = format(startOfToday(), 'yyyy-MM-dd');
          toDoInstance.reAddToDo(projectPosition, finishedIndex, finishedTodo.title, finishedTodo.description, finishedTodo.dueDate, finishedTodo.priority, false, finishedTodo.checkList);
          DisplayToDoFunc(projectPosition, toDoInstance, projectInstance, checkListInstance)
        })

        const finishTitle = document.createElement('h2');
        finishTitle.className = 'finishTitle';
        finishTitle.textContent = finishedTodo.title


        toDoItem.appendChild(toDoSquare);
        toDoItem.appendChild(finishTitle);
        finishedContainer.appendChild(toDoItem);
      })
      containerSeparator.appendChild(finishedContainer);
    }

  };
  
  //form modal creates a modal with the queries  for form
  const formModal = (projectPosition, todo = null, toDoIndex = null) => {
    modal.classList.add('open');
    overlay.classList.add('open');
    const toDoFormContainer = document.querySelector('.toDoFormContainer');
    const existingForm = document.querySelector('.toDoForm');
  
    if (existingForm) {
      return;
    }

    const toDoForm = document.createElement('form');
    toDoForm.classList.add('toDoForm');
    toDoForm.noValidate = true;

    const inputs = [
      {
        label: '(25 max Length) ToDo Name:',
        type: 'text',
        name: 'toDoName',
        id: 'toDoName',
        value: todo ? todo.title : '',
      },
      {
        label: '(25 max Length) ToDo Description:',
        type: 'text',
        name: 'toDoDescription',
        id: 'toDoDescription',
        value: todo ? todo.description : '',
      },
      {
        label: 'Due Date: ',
        type: 'date',
        name: 'toDoDueDate',
        id: 'toDoDueDate',
        value: todo ? todo.dueDate : '',
      },
    ];

    inputs.forEach((inputData) => {
      const label = document.createElement('label');
      label.textContent = inputData.label;
      label.setAttribute('for', inputData.id);

      const input = document.createElement('input');
      input.type = inputData.type;
      input.name = inputData.name;
      input.id = inputData.id;
      input.value = inputData.value;

      const span = document.createElement('span');
      span.className = 'error';
      span.ariaLive = 'polite';

    
      if (inputData.type !== 'date') {
        input.required = true;
        input.autofocus = false;
        input.setAttribute('autocomplete', 'off')
        input.addEventListener('input', () => {
          if (input.validity.valid) {
            span.textContent = ''
            span.className = 'error';
          } else {
            showError(input, span);
          }
       })
     } else {
        input.required = false;
        input.addEventListener('change', () => {
        showError(input, span);
      })
     }

      if (input.id === 'toDoName' || input.id === 'toDoDescription') {
        input.maxLength = 25;
      }

      if (input.id === 'toDoDueDate') {
        input.min = (format(startOfToday(), 'yyyy-MM-dd'))
      }
      toDoForm.appendChild(label);
      toDoForm.appendChild(input);
      toDoForm.appendChild(span);
      toDoForm.appendChild(document.createElement('br'));
    });
    //High, Medium, Low
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority: ';
    priorityLabel.setAttribute('for', 'toDoPriority');

    const priorityInput = document.createElement('select');
    priorityInput.name = 'toDoPriority';
    priorityInput.id = 'toDoPriority';

    const options = ['High', 'Medium', 'Low'];

    options.forEach((option) => {
      const priorityOption = document.createElement('option');
      priorityOption.textContent = option;
      priorityOption.value = option.toLowerCase();
      if (todo && todo.priority === option.toLowerCase()) {
        priorityOption.selected = true;
      }

      priorityInput.appendChild(priorityOption);
    });

    toDoForm.appendChild(priorityLabel);
    toDoForm.appendChild(priorityInput);
    const toDoButtons = document.createElement('div') 
    toDoButtons.classList.add('toDoButtons');

    const submitButton = document.createElement('button');
    submitButton.classList.add('submitButton')
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = todo ? 'Update ToDo' : 'Create ToDo';
    toDoButtons.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.classList.add('closeButton')
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'Close';
    toDoButtons.appendChild(closeButton);

    toDoForm.appendChild(toDoButtons);

    toDoFormContainer.appendChild(toDoForm);
    modal_inner.appendChild(toDoFormContainer);

    //addeventlisteners
    closeButton.addEventListener('click', () => {
      toDoForm.remove();

      modal.classList.remove('open');
      overlay.classList.remove('open');
    });

    toDoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = [
        {
          input: document.querySelector('#toDoName'),
          span:  document.querySelector('#toDoName + span.error')
        },
        {
          input: document.querySelector('#toDoDescription'),
          span:  document.querySelector('#toDoDescription + span.error')
        },
        {
          input: document.querySelector('#toDoDueDate'),
          span: document.querySelector('#toDoDueDate + span.error')
        },
      ];

      const toDoName = document.querySelector('#toDoName').value;
      const toDoDescription = document.querySelector('#toDoDescription').value;
      let toDoDueDate = document.querySelector('#toDoDueDate').value;
      const toDoPriority = document.querySelector('#toDoPriority').value;

      if (!toDoDueDate) {
        toDoDueDate = "No Due Date";
      }

      let isValid = true;
      inputs.forEach(({ input, span }) => {
        if (!input.validity.valid) {
          showError(input, span);
          isValid = false;
        }
      })
      
      if (parseISO(toDoDueDate) < startOfToday()) {
        alert('Not A Valid Due Date it has already passed');
        return;
      }

      if (!isValid) {
        alert('This form isnt submitted not a valid todo');
        return
      }

     
      if (todo) {
        const checkList = projectInstance.getCheckListArr(projectPosition, toDoIndex)
        const pinned = toDoInstance.selectToDo(projectPosition, toDoIndex).pinned
        toDoInstance.updateToDo(
          projectPosition,
          toDoIndex,
          toDoName,
          toDoDescription,
          toDoDueDate,
          toDoPriority,
          pinned,
          checkList
        );
      console.log(projectInstance.getToDoArr(projectPosition));
      } else {
        toDoInstance.insertToDoToProject(
          projectPosition,
          toDoName,
          toDoDescription,
          toDoDueDate,
          toDoPriority,
        );
      }
      DisplayToDoFunc(projectPosition, toDoInstance, projectInstance, checkListInstance);

      toDoForm.remove();

      modal.classList.remove('open');
      overlay.classList.remove('open');
    });
    
    const showError = (input, span) => {
      switch (input.id) {
        case 'toDoName':
          if (input.validity.valueMissing) {
            span.textContent = 'Name Value is Missing!';
          }
          break;
        case 'toDoDescription':
          if (input.validity.valueMissing) {
            span.textContent = 'Desc Value is Missing!';
          }
          break;
        case 'toDoDueDate':
          if (parseISO(input.value) < startOfToday()) {
            span.textContent = ('Not A Valid Due Date it has already passed');
          } else {
            span.textContent = '';
          }
          break;
      }
    }
  };
  //see the details when clicking the todo
  const seeToDoDetails = (todo, toDoIndex, projectPosition) => {
    content.classList.toggle('content2')

    toDoContainerTitle.textContent = '';
    toDoContainer.textContent = '';

    projectText.textContent = todo.title;
    toDoContainerTitle.appendChild(projectText);
    toDoContainer.classList.remove('grid');

    const toDoDetailsDiv = document.createElement('div');
    toDoDetailsDiv.classList.add('toDoDetailsDiv');
    
    
    const toDoDetailsContainer = document.createElement('div');
    toDoDetailsContainer.classList.add('toDoDetailsContainer');

    const toDoDetails = document.createElement('div');
    toDoDetails.classList.add('toDoDetails')

    const detailTitle = document.createElement('h1')
    detailTitle.classList.add('detailTitle');
    detailTitle.textContent = 'Details!';

    toDoDetails.appendChild(detailTitle);

    const details = []
    const toDoIndexAndTitle = document.createElement('h2');
    toDoIndexAndTitle.textContent = `Title: ${todo.title}`;
    details.push(toDoIndexAndTitle)

    const toDoDesc = document.createElement('h2');
    toDoDesc.textContent = `Description: ${todo.description}`;
    details.push(toDoDesc)

    const toDoDueDate = document.createElement('h2');
    if (todo.dueDate !== "No Due Date") {
      console.log(todo.dueDate)
      toDoDueDate.textContent = `Due Date: ${format(parseISO(todo.dueDate), 'PPPP')}`;
    } else {
      toDoDueDate.textContent = 'Due Date: Flexible';
    }

    details.push(toDoDueDate);

    const toDoPriority = document.createElement('h2');
    toDoPriority.textContent = `Priority: ${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}`;
    details.push(toDoPriority)

    details.forEach((detail) => {
      detail.classList.add('details');
      toDoDetails.appendChild(detail);
    })
    
    displayCheckListFunc(projectInstance, checkListInstance, toDoIndex, projectPosition);
    
    //buttondiv
    const buttons = document.createElement('div');
    buttons.classList.add('buttonDiv');
    const finishToDo = document.createElement('button');
    finishToDo.textContent = 'Finish It!';
    finishToDo.classList.add('toDoButton');
    finishToDo.id = 'finish';

    buttons.appendChild(finishToDo);

    finishToDo.addEventListener('click', () => {
      const checkList = todo.checkList
      console.log(checkList);
      for (let i in checkList) {
        if (checkList[i].done === false) {
          alert('Pls Complete Your Action List Before Finishing This To Do')
          return;
        }
      }
      toDoInstance.finishToDo(projectPosition, toDoIndex, todo.title, todo.description, todo.dueDate, todo.priority, false, todo.checkList);
      DisplayToDoFunc(projectPosition,toDoInstance, projectInstance, checkListInstance);
    });

    const editToDo = document.createElement('button');
    editToDo.textContent = 'Edit ✎';
    buttons.appendChild(editToDo);
    editToDo.classList.add('toDoButton')
    editToDo.id = 'edit'

    editToDo.addEventListener('click', () => {
      formModal(projectPosition, todo, toDoIndex);
    });

    const goBack = document.createElement('button');
    goBack.textContent = 'Go Back <<';
    buttons.appendChild(goBack)
    goBack.classList.add('toDoButton')
    goBack.id = 'goBack'

    goBack.addEventListener('click', () => {
      content.classList.toggle('content2')
      DisplayToDoFunc(projectPosition, toDoInstance, projectInstance, checkListInstance);
    })

    toDoDetailsContainer.appendChild(toDoDetails);
    toDoDetailsContainer.appendChild(checkListDiv);
    
    toDoDetailsDiv.appendChild(toDoDetailsContainer)
    toDoDetailsDiv.appendChild(buttons);

    toDoContainer.appendChild(toDoDetailsDiv);
  };
};
