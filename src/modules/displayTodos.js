export const DisplayToDoFunc = (projectPosition, toDoInstance, projectInstance, checkListInstance) => {

  const content = document.querySelector('.content');
  content.classList.remove('content2');

  const toDoContainer = document.querySelector('.toDoContainer');
  toDoContainer.textContent = '';
  content.appendChild(toDoContainer);

  paragraphTitle.textContent = `To-Dos: ${projectInstance.getProjectArr()[projectPosition].name}`;

  const toDoContainerTitle = document.querySelector('.toDoTitle');
  toDoContainerTitle.appendChild(paragraphTitle);

  const createToDoHandler = (projectPosition) => {
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

  createToDoHandler(projectPosition);

  const sortToDoHandler = () => {
    const checkSortToDoButton = document.querySelector('.sortDiv');
    if (checkSortToDoButton) {
      checkSortToDoButton.remove();
    }
    const sortDiv = document.createElement('div');
    sortDiv.classList.add('sortDiv');
    const sortPara = document.createElement('p');
    sortPara.classList.add('sort');
    sortPara.textContent = 'Sort';

    const sortToDoButton = document.createElement('img');
    sortToDoButton.src = sortImg;
    sortToDoButton.classList.add('logos', 'sortToDoButton');
    
    sortToDoButton.addEventListener('click', () => {
      projectInstance.sortToDoArr(projectPosition);
      viewTodos();
    });

    sortDiv.appendChild(sortPara);
    sortDiv.appendChild(sortToDoButton);
    toDoContainerTitle.appendChild(sortDiv);
  };

  sortToDoHandler();

  const viewTodos = () => {
    toDoContainer.textContent = '';
    toDoContainer.classList.add('grid');
    const todos = projectInstance.getToDoArr(projectPosition) || [];

    if (todos.length === 0) {
      const p = document.createElement('p');
      p.className = 'emptyPara';
      p.textContent = 'Currently No To Dos Go Add a Few!';
      toDoContainer.appendChild(p);
    }
    loadToDos();
    
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
  
        toDoSquare.addEventListener('click', () => {
          seeToDoDetails(todo, index, projectPosition);
        });
  
        const toDoIndexAndTitle = document.createElement('h2');
        toDoIndexAndTitle.className = 'toDoItem-title'
        toDoIndexAndTitle.textContent = `${todo.title}`;
  
        const toDoDueDate = document.createElement('h2');
        toDoDueDate.textContent = `${todo.dueDate}`;
  
        toDoItem.appendChild(toDoSquare);
        toDoItem.appendChild(toDoIndexAndTitle);
        toDoItem.appendChild(toDoDueDate);
  
        toDoContainer.appendChild(toDoItem);
      });
    }
  };

  viewTodos();

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
      toDoForm.appendChild(label);
      toDoForm.appendChild(input);
      toDoForm.appendChild(span);
      toDoForm.appendChild(document.createElement('br'));
    });

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
        toDoInstance.updateToDo(
          projectPosition,
          toDoIndex,
          toDoName,
          toDoDescription,
          toDoDueDate,
          toDoPriority
        );
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
          if (new Date(input.value) < startOfToday()) {
            span.textContent = ('Not A Valid Due Date it has already passed');
          } else {
            span.textContent = '';
          }
          break;
      }
    }
  };

  const seeToDoDetails = (todo, toDoIndex, projectPosition) => {
    content.classList.toggle('content2')

    toDoContainerTitle.textContent = '';
    toDoContainer.textContent = '';

    paragraphTitle.textContent = todo.title;
    toDo

