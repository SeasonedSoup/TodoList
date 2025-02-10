//next idea is show todos on each project maybe add a button or make the project text itself a button not sure how id do that but to be noted
//add a button or maybe default that shows display on a different container but it has to follow the proper projects toDoList
const instanceOfTodos = ToDoFunc();
console.log(instanceOfTodos);  
//test

export const toDoDisplayFunc = (projectPosition) => {
    //shortcut
    const createAndAppendElement = (typeOfElement, className, IdName, textDom) => {
        const newElement = document.createElement(typeOfElement);
        if(className) newElement.classList.add(className);
        if(IdName) newElement.id = IdName;
        if (textDom) newElement.textContent = textDom;
    }

    const toDoContainer = document.querySelector('.toDoContainer');
    toDoContainer.textContent = '';

    const toDoTitle = document.querySelector('.toDoTitle');
    toDoTitle.textContent = '';

    const paragraphTitle = document.createElement('p');
    paragraphTitle.textContent = 'To-Dos'

    const newToDoBtn = document.createElement('button');
    newToDoBtn.classList.add('newToDoBtn');
    newToDoBtn.textContent = 'New';

    const returnToProjectCardsBtn = document.createElement('button');
    returnToProjectCardsBtn.classList.add('returnToProjectCardsBtn');
    returnToProjectCardsBtn.textContent = '<< Return';

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');
    
    buttonContainer.appendChild(newToDoBtn);
    buttonContainer.appendChild(returnToProjectCardsBtn);

    const cards = document.createElement('div');
    cards.classList.add('cards');
    toDoContainer.appendChild(cards);


    toDoTitle.appendChild(paragraphTitle);


    console.table(instanceOfTodos.selectToDo(positionProject));

    
    
    const returnToDoDatas = () => {
        instanceOfTodos.selectToDo(projectPosition).map((toDo, index) => {
            let title = toDo.title;
            let description = toDo.description;
            let dueDate = toDo.dueDate;
            let priority = toDo.priority;
            let positionToDo = index;

            toDoController(title, description, dueDate, priority, positionToDo);
        })
    }

    //ok so to display the todo the todo will be on a todoarray on todo.js the selectToDoFunction will play a part here
    const toDoController = (name, desc, dueDate, priority, positionToDo) => {
        const toDoCard = document.createElement('div');
        toDoCard.classList.add('toDoCard');

    }

    //to do controller
}