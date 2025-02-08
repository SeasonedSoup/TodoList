//next idea is show todos on each project maybe add a button or make the project text itself a button not sure how id do that but to be noted
//add a button or maybe default that shows display on a different container but it has to follow the proper projects toDoList
const instanceOfTodos = ToDoFunc();
console.log(instanceOfTodos);  
//test

export const toDoDisplayFunc = (projectPosition) => {

    const toDoContainer = document.querySelector('.toDoContainer');
    toDoContainer.textContent = '';
    
    
    //dummy data for todos

    instanceOfTodos.insertToDoToProject(projectPosition, 'Create To Do List App', 'Practice your js skillz', 'now', 'low')
    console.log(instanceOfTodos.selectToDo(projectPosition));


   /* const title = document.querySelector('.title');
    title.textContent = ''; */
    console.table(instanceOfTodos.selectToDo(positionProject));

    
    
    const returnToDoDatas = () => {
        instanceOfTodos.selectToDo(projectPosition).map((toDo, index) => {
            let title = toDo.title
            let description = toDo.description
            let dueDate = toDo.dueDate
            let priority = toDo.priority
            let positionToDo = index;

            return {title, description, dueDate, priority, positionToDo};
        })
    }

    //ok so to display the todo the todo will be on a todoarray on todo.js the selectToDoFunction will play a part here


    //to do controller
}