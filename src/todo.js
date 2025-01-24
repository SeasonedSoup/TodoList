class ToDoItem {
    constructor(title, description, dueDate, priority = 'low', checklist = []) {
        const validPriorities = ['low', 'medium', 'high']

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = validPriorities.includes(priority.toLowerCase()) ? priority.toLowerCase() : 'low'; //checks if the prio para is included as a valid priority
        this.complete = false;
        this.checklist = checklist;
    }

    toggleComplete = () => {
        this.complete = !this.complete;
    }

    // ideas
    // toggleChecklist
    //createandappendchecklsits?
}

export default ToDoItem;