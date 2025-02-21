import { ToDoFunc } from './todo';
import { ProjectFunc } from './project';

export const bugCheck = () => {
    const instanceOfTodos = ToDoFunc();
    console.log("Todos instance:", instanceOfTodos);
    
    const instanceOfProjectsFromTodo = ProjectFunc();
    console.log(instanceOfProjectsFromTodo.getProjectArr());
}
export const toDoDisplayFunc = (projectPosition) => {
    const instanceOfTodos = ToDoFunc();
    console.log("Todos instance:", instanceOfTodos);

    const instanceOfProjectsFromTodo = ProjectFunc();
    console.log(instanceOfProjectsFromTodo.getProjectArr());

    const toDoContainer = document.querySelector('.toDoContainer');
    toDoContainer.textContent = '';

    const toDoContainerTitle = document.querySelector('.toDoTitle');
    const paraTitleCheck = document.querySelector('.paragraphTitle');
    if (!paraTitleCheck) {
    const paragraphTitle = document.createElement('h1');
    paragraphTitle.textContent = 'To Dos';
    paragraphTitle.classList.add('paragraphTitle');
    toDoContainerTitle.appendChild(paragraphTitle);
    }
    
    if (projectPosition === null || projectPosition === undefined) {
        toDoContainer.innerHTML = "<p>No project selected.</p>";
        return;
    }

    const todos = instanceOfTodos.selectToDo(projectPosition);
    const project = instanceOfProjectsFromTodo.getProjectArr()[projectPosition];
    console.log('HI Project:', project); // Debugging line
    const name = project.name;

    const index = document.createElement('h1');
    index.textContent = `Project ${projectPosition + 1}: ${name}`;
    toDoContainer.appendChild(index);
    
    
       
    //==
    todos.forEach((todo, index) => {
        const toDoItem = document.createElement('div');
        toDoItem.classList.add('toDoItem');

        const toDoIndexAndTitle = document.createElement('h2');
        toDoIndexAndTitle.textContent = `${index + 1}. ${todo.title}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X'

       
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit'


        removeButton.addEventListener('click', () => { 
            //probabaly call form first before doing this where ask if sure or not
            instanceOfTodos.removeToDo(projectPosition, index);
            toDoDisplayFunc(projectPosition);
        });

        editButton.addEventListener('click',  () => {
            editFormModal();
        });

        toDoItem.appendChild(toDoIndexAndTitle);
        toDoItem.appendChild(removeButton);
        toDoItem.appendChild(editButton);

        toDoContainer.appendChild(toDoItem);
    });

    const createToDoHandler = () => {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');

        const createToDoButton = document.createElement('button');
        createToDoButton.textContent = 'Create To Do';
        createToDoButton.addEventListener('click', () => {
            formModal();
        });
        buttonDiv.appendChild(createToDoButton);
        toDoContainer.appendChild(buttonDiv);
    }

    const formModal = () => {

        const toDoFormContainer = document.querySelector('.toDoFormContainer')
        const existingForm = document.querySelector('.toDoForm');

        if (existingForm) {
            return;
        }
    
        const toDoForm = document.createElement('form');
        toDoForm.classList.add('toDoForm');

        const inputs = [
            {label: 'ToDo Name:', type:'text', name:'toDoName', id:'toDoName' },
            {label: 'ToDo Description:', type:'text', name:'toDoDescription', id:'toDoDescription'}, 
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
            instanceOfTodos.insertToDoToProject(projectPosition,toDoName,toDoDescription);
            toDoDisplayFunc(projectPosition);

            toDoForm.remove();
        })
    }
        //this will have edit pencil logo for each todo or maybe like a dropdown to see its details
    const editFormModal = () => {

        const toDoFormContainer = document.querySelector('.toDoFormContainer')
        const existingForm = document.querySelector('.toDoForm');

        if (existingForm) {
            return;
        }
        
        const toDoForm = document.createElement('form');
        toDoForm.classList.add('toDoForm');
    
        const inputs = [
            {label: 'ToDo Name:', type:'text', name:'toDoName', id:'toDoName' },
            {label: 'ToDo Description:', type:'text', name:'toDoDescription', id:'toDoDescription'}, 
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
            instanceOfTodos.insertToDoToProject(projectPosition,toDoName,toDoDescription);
            toDoDisplayFunc(projectPosition);
    
            toDoForm.remove();
        })
    }
    createToDoHandler();
}