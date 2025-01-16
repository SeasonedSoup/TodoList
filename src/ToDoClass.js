export class ToDoItem{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
    }

    toggleComplete = () => {
        this.complete = !this.complete
    }


}