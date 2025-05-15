# Just To Do It
#### Video Demo:  <https://youtu.be/4UHHjSFIayM?si=FCo0E_s4jtUgf2o9>
#### Description: This Final Project I made is a To-Do List titled *Just To Do It*. I made this as my final project because I often have a hard time picking up and forgetting tasks that I have to do or usually procrastinate if a task is overwhelming which I would like to solve by creating this To-do List to keep myself on track. It's also just a reference to *Just Do It*

#### Features Implemented: *Just To Do It*'s main schtick is to create a Project Section that is thematic e.g (Homework, To-Do List Progress, Personal, Cleaning) where you create these said To-Dos or Tasks related to the project Section. Within each said To-Dos contain an Action List numbered in ascending order where you add actions that kickstarts, progress, or finish a To-do to keep on track.

##### Project Sections: Can be found on the left side it is up to you how to set it up can be thematic or something *big like a __project!__*
##### To-Do Lists: Can be found on the main content (right side) and is default nested as an object inside each projects inside the projectArray.
##### Action List: When clicking a todo, you will notice theres an empty action list, it is not inherently required to use and depends on how it is used. but it can be utilized through ordered steps, or sections to keep your progress on track on a certain To Do. this was primarily made when the todo is complex that you must break it down in order to not be overwhelmed.
##### Local Storage Persistence: Utilizes the local storage Api with straightforward useable functions setItem and getItem
##### Extras:
###### Finish List: A history bin list containing the todos you have finished, can be cleared or re added back, great for repeating commonly used todos
###### Dark Mode: A Dark Mode Feature that saves
###### Quote Transition: Quote Transition Feature that just cycles through 3 setted quotes added when clicking an arrow.

#### Files in Depth: The Files in this project contained are as follows: index.js styles.css template.html, modules and a webpack configuration file. Within index.js and template.html are the ones that will contain the required resources for webpack to bundle as a web application. Within modules are the logic, dom manipulation, etc that runs the bulk of the code *WARNING!!!(will contain nerdy terms).*

##### Main Logic Modules: these contain *project.js, todo.js, checklist.js* which has the required methods to save, select, modify and / or create the objects and more.

###### project.js: Returns a factory function containing the projectArr which stores all the projects made and its respective properties as well as its methods e.g (getProjectArr, createProject, updateProject, deleteProject etc.). This is also where the localStorage Api is utilized which contains saveProject and restoreProjectLocally that is distributed accross the other two logic files which uses (setItem, getItem) from localStorage in order to persist data only locally, I have decided utilizing local storage because it was something simple and thought that doing database may be overkill. project properties are as follows *(name, toDoList = [], finishList = [])*
**Note that the = [] means it defaults as an array when it is not provided**.

###### toDo.js: Contains the toDo Objects and relies on the methods provided by project.js. Its main responsibility is handling the CRUD operations for todos. toDo properties are as follows *(title, description, dueDate, priority, pinned = false, checklist = [])*, these todos are then inserted towards the toDoList array of a project.

###### checklist.js: Responsible for the action list, it contains the CRUD operations for the checklist. Contains the checkbox object. Checkbox properties are as follows *(checkbox, done = false)*, these are inserted towards the checklist array of a to do.

##### Display Modules: Next within modules contain *displayProject.js, displayTodos.js, and displayCheckList.js* which its main responsibility is to show the project, todo, and checkList values on the browser / web and utilizes the methods provided by the previous 3 functions *(project.js, todo.js, checklist.js)* through either a form, button, prompt query and other ways as well etc. Such functions that contain within are (loadProjects, createProjectHandler, deleteProjectHandler) from displayProject. (viewToDos, sortToDoHandler, pinToDoHandler, seeToDoDetails) from displayTodos.js and (displayCheckList, checkListFormModal) from displayCheckList.

##### Extra Modules: Additionally, there are other extra module files as well in the module directory which are *element.js, quoteTransition.js*. the main use of element.js is to transport elements that are static towards the other display module files and was my initial idea to prevent repetition of creating and removing said elements and instead just reseting their text content so its not redundant and ends up with less lines of code. quoteTransition.js is just a simple function that just shows the current quote made through  the initial current quote index and the logic for moving the index left to right and assigning the active quite the active class.

##### Logos: Logo directory that contains logos taken from mainly *Pictogrammer* a website that gives free logos and are imported from where they are needed

##### Styles: reset.css from meyer web. Utilized css then imported them through the index.js (the entry) to run as I am utilizing webpack through the filename webpack.config.js to bundle my sources that are specified such as the html, css and svg/images. Also took a font from google fonts and just put in the head of the tempalte html file.

#### How it was built: Utilized webpack through using npx webpack serve and gives a local server and decided to push to gh-pages so it can be easily accesed

#### Setup: With the program language I chose to use vanilla javascript as it can be a good foundation for now rather than relying on a framework and as I am also following the odin project

#### Design Decisions: I first started with utilizing classes but then decided to just utilize factory functions due to it being a bit verbose with this at the beginning of this project.

#### Future Updates Possibly: Draggable and Adjustable projects/ todos, pomodoro timer, notification, improvements on ui rather than prompts and alerts for the other features, mobile accessibility.

#### References on Assets: https://meyerweb.com/eric/tools/css/reset/, https://pictogrammers.com/, https://fonts.google.com/specimen/Bytesized.
