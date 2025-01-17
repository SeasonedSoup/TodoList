export class ToDoItem{
    constructor(title, description, dueDate, priority = 'low') {
        const validPriorities = ['low', 'medium', 'high']

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = validPriorities.includes(priority.toLowerCase()) ? priority.toLowerCase() : 'low'; //checks if the prio para is included as a valid priority
        this.complete = false;
    }

    toggleComplete = () => {
        this.complete = !this.complete
    }
    //hmm how do i toggle priority
    togglePriority = () => {
        const validPriorities = ['low', 'medium', 'high']
        let index = validPriorities.indexOf(this.priority)
        this.priority = validPriorities[(index + 1) % validPriorities.length]
    }


}