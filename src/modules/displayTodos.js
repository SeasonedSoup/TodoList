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
    const paraTitleCheck = document.querySelector('.paraTitle');
    if (!paraTitleCheck) {
    const paragraphTitle = document.createElement('h1');
    paragraphTitle.textContent = 'To Dos';
    paragraphTitle.classList.add('paraTitle');
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

    if(!todos || todos.length === 0) {
        instanceOfTodos.insertToDoToProject(projectPosition, "Buy Groceries", "Milk, Eggs, Bread", "Tomorrow", "High");
        instanceOfTodos.insertToDoToProject(projectPosition, "Study JavaScript", "Review closures and promises", "Next Week", "Medium");
        instanceOfTodos.insertToDoToProject(projectPosition, "Workout", "Leg day at the gym", "Today", "Low");
    };
    
    const index = document.createElement('h1');
    index.textContent = `Project ${projectPosition + 1}: ${name}`;
    toDoContainer.appendChild(index);
    todos.forEach((todo) => {
        const toDoTitle = document.createElement('h2');
        toDoTitle.textContent = todo.title;
        toDoContainer.appendChild(toDoTitle);
    });

    const createToDoHandler = () => {
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');

        const createToDoButton = document.createElement('button');
        createToDoButton.textContent = 'Create To Do';
        createToDoButton.addEventListener('click', () => {
            formModal(projectPosition);
        });
        buttonDiv.appendChild(createToDoButton);
        toDoContainer.appendChild(buttonDiv);
    }

    const formModal = (projectPosition) => {

        const toDoFormContainer = document.querySelector('.toDoFormContainer')
        const existingForm = document.querySelector('.toDoForm');

        if (existingForm) {
            return;
        }
    
        const toDoForm = document.createElement('form');
        toDoForm.classList.add('toDoForm');

        const inputs = [
            {label: 'ToDo Name:', type:'text', name:'toDoName', id:'toDoName' },
            {label: 'ToDo Description:', type:'text', name:'toDoDescription', id:'toDoName'}, 
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

        const submitButton  = document.createElement('button');
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

        toDoForm.addEventListener('click', (e) => {
            e.preventDefault();
            
            const toDoName = document.querySelector('#toDoName');
            const toDoDescription = document.querySelector('#toDoDescription');
            instanceOfTodos.insertToDoToProject(toDoName,toDoDescription);
        })

        //const dueDateInput = document.createElement()
    }
    createToDoHandler();
}