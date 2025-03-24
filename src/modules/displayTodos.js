import { ToDoFunc } from "./todo";
import { ProjectFunc } from "./project";
import { parseISO, startOfToday } from "date-fns";

export const toDoDisplayFunc = (projectPosition) => {
  const instanceOfTodos = ToDoFunc();
  const instanceOfProjectsFromTodo = ProjectFunc();

  const toDoContainer = document.querySelector(".toDoContainer");
  toDoContainer.textContent = "";

  const toDoContainerTitle = document.querySelector(".toDoTitle");
  const paraTitleCheck = document.querySelector(".paragraphTitle");

  if (!paraTitleCheck) {
    const paragraphTitle = document.createElement("h1");
    paragraphTitle.textContent = `To-Dos: ${instanceOfProjectsFromTodo.getProjectArr()[projectPosition].name}`;
    paragraphTitle.classList.add("paragraphTitle");

    toDoContainerTitle.appendChild(paragraphTitle);
  } else {
    paraTitleCheck.textContent = `To-Dos: ${instanceOfProjectsFromTodo.getProjectArr()[projectPosition].name}`;
  }

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const modal = document.createElement("div");
  overlay.appendChild(modal);
  modal.classList.add("modal");

  const modal_inner = document.createElement("div");
  modal_inner.classList.add("inner-modal");

  modal.appendChild(modal_inner);
  document.body.appendChild(overlay);

  const getProjectPosition = () => projectPosition;

  const createToDoHandler = (getProjectPosition) => {
    const checkToDoButton = document.querySelector(".createToDoButton");

    if (checkToDoButton) {
      checkToDoButton.remove();
    }

    const createToDoButton = document.createElement("button");
    createToDoButton.textContent = "Add To-Do +";
    createToDoButton.classList.add("createToDoButton");

    createToDoButton.addEventListener("click", () => {
      const projectPosition = getProjectPosition();
      formModal(projectPosition);
    });

    toDoContainerTitle.appendChild(createToDoButton);
  };

  createToDoHandler(getProjectPosition);

  const viewTodos = () => {
    toDoContainer.textContent = "";

    const todos = instanceOfTodos.selectToDo(projectPosition);

    todos.forEach((todo, index) => {
      const toDoItem = document.createElement("div");
      toDoItem.classList.add("toDoItem");

      const toDoSquare = document.createElement("div");
      toDoSquare.classList.add("square");
      toDoSquare.addEventListener("click", () => {
        seeToDoDetails(todo, index, getProjectPosition);
      });

      const toDoIndexAndTitle = document.createElement("h2");
      toDoIndexAndTitle.textContent = `${todo.title}`;

      const toDoDueDate = document.createElement("h2");
      toDoDueDate.textContent = `${todo.dueDate}`;

      toDoItem.appendChild(toDoSquare);
      toDoItem.appendChild(toDoIndexAndTitle);
      toDoItem.appendChild(toDoDueDate);

      toDoContainer.appendChild(toDoItem);
    });
  };

  viewTodos();

  const formModal = (projectPosition, todo = null, toDoIndex = null) => {
    modal.classList.add("open");
    overlay.classList.add("open");
    const toDoFormContainer = document.querySelector(".toDoFormContainer");
    const existingForm = document.querySelector(".toDoForm");
  
    if (existingForm) {
      return;
    }

    const toDoForm = document.createElement("form");
    toDoForm.classList.add("toDoForm");

    const inputs = [
      {
        label: "(50 max Length) ToDo Name:",
        type: "text",
        name: "toDoName",
        id: "toDoName",
        value: todo ? todo.title : "",
      },
      {
        label: "ToDo Description:",
        type: "text",
        name: "toDoDescription",
        id: "toDoDescription",
        value: todo ? todo.description : "",
      },
      {
        label: "Due Date: ",
        type: "date",
        name: "toDoDueDate",
        id: "toDoDueDate",
        value: todo ? todo.dueDate : "",
      },
    ];

    inputs.forEach((inputData) => {
      const label = document.createElement("label");
      label.textContent = inputData.label;
      label.setAttribute("for", inputData.id);

      const input = document.createElement("input");
      input.type = inputData.type;
      input.name = inputData.name;
      input.id = inputData.id;
      input.value = inputData.value;

      const span = document.createElement('span');
      span.className = 'error';
      span.ariaLive = 'polite';

    
      if (inputData.type !== 'date') {
        input.required = true;
        input.addEventListener('input', () => {
          if (input.validity.valid) {
            span.textContent = ''
            span.className = 'error';
          } else {
            showError(input, span);
          }
       })
     } else {
        input.required = false;
        input.addEventListener('change', () => {
        showError(input, span);
      })
     }

    

      if (input.id === 'toDoName') {
        input.maxLength = 50;
      }
      
      

      toDoForm.appendChild(label);
      toDoForm.appendChild(input);
      toDoForm.appendChild(span);
      toDoForm.appendChild(document.createElement("br"));
    });
    //High, Medium, Low
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority: ";
    priorityLabel.setAttribute("for", "toDoPriority");

    const priorityInput = document.createElement("select");
    priorityInput.name = "toDoPriority";
    priorityInput.id = "toDoPriority";

    const options = ["High", "Medium", "Low"];

    options.forEach((option) => {
      const priorityOption = document.createElement("option");
      priorityOption.textContent = option;
      priorityOption.value = option.toLowerCase();
      if (todo && todo.priority === option.toLowerCase()) {
        priorityOption.selected = true;
      }

      priorityInput.appendChild(priorityOption);
    });

    toDoForm.appendChild(priorityLabel);
    toDoForm.appendChild(priorityInput);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = todo ? "Update ToDo" : "Create ToDo";
    toDoForm.appendChild(submitButton);

    const closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.textContent = "Close";
    toDoForm.appendChild(closeButton);

    toDoFormContainer.appendChild(toDoForm);
    modal_inner.appendChild(toDoFormContainer);

    //addeventlisteners
    closeButton.addEventListener("click", () => {
      toDoForm.remove();

      modal.classList.remove("open");
      overlay.classList.remove("open");
    });

    toDoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const toDoName = document.querySelector("#toDoName").value;
      const toDoDescription = document.querySelector("#toDoDescription").value;
      const toDoDueDate = document.querySelector("#toDoDueDate").value;
      const toDoPriority = document.querySelector("#toDoPriority").value;
      
      if (parseISO(toDoDueDate) < startOfToday()) {
        alert("Not A Valid Due Date it has already passed");
        return;
      }

      if (todo) {
        instanceOfTodos.updateToDo(
          projectPosition,
          toDoIndex,
          toDoName,
          toDoDescription,
          toDoDueDate,
          toDoPriority,
        );
      } else {
        instanceOfTodos.insertToDoToProject(
          projectPosition,
          toDoName,
          toDoDescription,
          toDoDueDate,
          toDoPriority,
        );
      }
      toDoDisplayFunc(projectPosition);

      toDoForm.remove();

      modal.classList.remove("open");
      overlay.classList.remove("open");
    });
    
    const showError = (input, span) => {
      switch (input.id) {
        case 'toDoName':
          if (input.validity.valueMissing) {
            span.textContent = 'Name Value is Missing!';
          }
          break;
        case 'toDoDescription':
          if (input.validity.valueMissing) {
            span.textContent = 'Desc Value is Missing!';
          }
          break;
        case 'toDoDueDate':
          if (new Date(input.value) < startOfToday()) {
            span.textContent = ("Not A Valid Due Date it has already passed");
          } else {
            span.textContent = '';
          }
          break;
      }
    }
  };



  const seeToDoDetails = (todo, toDoIndex, getProjectPosition) => {
    toDoContainer.textContent = "";

    const toDoDetailsDiv = document.createElement("div");
    toDoDetailsDiv.classList.add("toDoDetailsDiv");

    const toDoIndexAndTitle = document.createElement("h2");
    toDoIndexAndTitle.textContent = `Title: #${toDoIndex + 1} ${todo.title}`;

    const toDoDesc = document.createElement("h2");
    toDoDesc.textContent = `Description: ${todo.description}`;

    const toDoDueDate = document.createElement("h2");
    toDoDueDate.textContent = `Due Date: ${todo.dueDate}`;

    const toDoPriority = document.createElement("h2");
    toDoPriority.textContent = `Priority: ${todo.priority}`;

    const finishToDo = document.createElement("button");
    finishToDo.textContent = "Finish It!";

    finishToDo.addEventListener("click", () => {
      instanceOfTodos.removeToDo(getProjectPosition(), toDoIndex);
      console.log(
        "removed" +
          instanceOfProjectsFromTodo.getToDoArr(getProjectPosition().name),
      );
      viewTodos();
    });

    const editToDo = document.createElement("button");
    editToDo.textContent = "Edit";

    editToDo.addEventListener("click", () => {
      formModal(getProjectPosition(), todo, toDoIndex);
    });

    const goBack = document.createElement("button");
    goBack.textContent = '>';

    goBack.addEventListener('click', () => {
      toDoDisplayFunc(projectPosition);
    })

    toDoDetailsDiv.appendChild(toDoIndexAndTitle);
    toDoDetailsDiv.appendChild(toDoDesc);
    toDoDetailsDiv.appendChild(toDoDueDate);
    toDoDetailsDiv.appendChild(toDoPriority);
    toDoDetailsDiv.appendChild(finishToDo);
    toDoDetailsDiv.appendChild(editToDo);
    toDoDetailsDiv.appendChild(goBack);

    toDoContainer.appendChild(toDoDetailsDiv);
  };
  //this will have edit pencil logo for each todo or maybe like a dropdown to see its detail
};
