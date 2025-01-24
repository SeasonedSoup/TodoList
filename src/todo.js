export default CreateToDoItem;

import ProjectManager from "./project";

class CreateToDoItem {
    constructor(title, description, dueDate, priority = 'low') {
        const validPriorities = ['low', 'medium', 'high']

        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = validPriorities.includes(priority.toLowerCase()) ? priority.toLowerCase() : 'low'; //checks if the prio para is included as a valid priority
        this.complete = false;
    }
    returnDetails = () => {
        return {this.title, this}
    }
}

// ideas
    // toggleChecklist
    //createandappendchecklsits?