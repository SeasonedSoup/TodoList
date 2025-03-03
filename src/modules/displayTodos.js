import { ToDoFunc } from './todo';
import { ProjectFunc } from './project';

export const toDoDisplayFunc = (projectPosition) => {
    const instanceOfTodos = ToDoFunc();
    const instanceOfProjectsFromTodo = ProjectFunc();


    const swapToDoName = () => {
        paraTitleCheck.textContent = `To-Dos: ${instanceOfProjectsFromTodo.getProjectArr()[projectPosition].name}`;
    }

    const toDoContainer = document.querySelector('.toDoContainer');
    toDoContainer.textContent = '';

    const toDoContainerTitle = document.querySelector('.toDoTitle');
    const paraTitleCheck = document.querySelector('.paragraphTitle');
    
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('titleDiv');
    
    
    if (!paraTitleCheck) {
        const paragraphTitle = document.createElement('h1');
        paragraphTitle.textContent = `To-Dos: ${instanceOfProjectsFromTodo.getProjectArr()[projectPosition].name}`;
        paragraphTitle.classList.add('paragraphTitle');

        titleDiv.appendChild(paragraphTitle);
        toDoContainerTitle.appendChild(titleDiv);
    }

    
    const createToDoHandler = () => {
        const checkToDoButton = document.querySelector('.createToDoButton');
            if(!checkToDoButton) {
                const createToDoButton = document.createElement('button');
                createToDoButton.textContent = 'Add To-Do +';
                createToDoButton.classList.add('createToDoButton');
                createToDoButton.addEventListener('click', () => {
                    formModal();
                });
                titleDiv.appendChild(createToDoButton);
                toDoContainerTitle.appendChild(titleDiv);
            }
        }
    createToDoHandler();

    const todos = instanceOfTodos.selectToDo(projectPosition);
    const project = instanceOfProjectsFromTodo.getProjectArr()[projectPosition];
    console.log('HI Project:', project); // Debugging line

    //==
    todos.forEach((todo, index) => {
        const toDoItem = document.createElement('div');
        toDoItem.classList.add('toDoItem');

        const toDoSquare = document.createElement('div');
        toDoSquare.classList.add('square')
        toDoSquare.addEventListener('click', () => {
            editFormModal(index);
        })

        const toDoIndexAndTitle = document.createElement('h2');
        toDoIndexAndTitle.textContent = `${todo.title}`;

        const toDoDueDate = document.createElement('h2');
        toDoDueDate.textContent = `${todo.dueDate}`;

        toDoItem.appendChild(toDoSquare);
        toDoItem.appendChild(toDoIndexAndTitle);
        toDoItem.appendChild(toDoDueDate);

        toDoContainer.appendChild(toDoItem);
    });

    const formModal = () => {

        const toDoFormContainer = document.querySelector('.toDoFormContainer');
        const existingForm = document.querySelector('.toDoForm');

        if (existingForm) {
            return;
        }
    
        const toDoForm = document.createElement('form');
        toDoForm.classList.add('toDoForm');

        const inputs = [
            {label: 'ToDo Name:', type:'text', name:'toDoName', id:'toDoName' },
            {label: 'ToDo Description:', type:'text', name:'toDoDescription', id:'toDoDescription'}, 
            {label: 'Due Date: ', type:'date', name: 'toDoDueDate', id: 'toDoDueDate'},
        ];

        inputs.forEach((inputData) => {
            const label = document.createElement('label');
            label.textContent = inputData.label;
            label.setAttribute('for', inputData.id)

            const input = document.createElement('input');
            input.type = inputData.type;
            input.name = inputData.name;
            input.id = inputData.id;

            input.required = true;

            toDoForm.appendChild(label)
            toDoForm.appendChild(input)
            toDoForm.appendChild(document.createElement('br'));
        })
        //High, Medium, Low
        const priorityLabel = document.createElement('label');
        priorityLabel.textContent = 'Priority: '
        priorityLabel.setAttribute('for', 'toDoPriority');

        const priorityInput = document.createElement('select');
        priorityInput.name = 'toDoOptions';
        priorityInput.id = 'toDoOptions';

        const options = ['High', 'Medium', 'Low'];

        options.forEach(option => {
            const priorityOption = document.createElement('option');
            priorityOption.textContent = option;
            priorityOption.value = option.toLowerCase();

            priorityInput.appendChild(priorityOption);
        });

        toDoForm.appendChild(priorityLabel);
        toDoForm.appendChild(priorityInput);

        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        submitButton.textContent = 'Create ToDo';
        toDoForm.appendChild(submitButton);
        
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.textContent = 'Close';
        toDoForm.appendChild(closeButton);

        toDoFormContainer.appendChild(toDoForm);

        //addeventlisteners
        closeButton.addEventListener('click', () => {
            toDoForm.remove();
        })

        toDoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const toDoName = document.querySelector('#toDoName').value;
            const toDoDescription = document.querySelector('#toDoDescription').value;
            const toDoDueDate = document.querySelector('#toDoDueDate').value;
            const toDoPriority = document.querySelector('#toDoOptions').value;

            instanceOfTodos.insertToDoToProject(projectPosition,toDoName,toDoDescription,toDoDueDate,toDoPriority);
            toDoDisplayFunc(projectPosition);

            toDoForm.remove();
        })
    }
    return { swapToDoName };
        //this will have edit pencil logo for each todo or maybe like a dropdown to see its detail
}