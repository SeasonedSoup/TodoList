import cogImg from "../logos/cog.svg";
import { sidebar, textTitle, buttons, paragraphTitle, createProjectButton, overlay, modal, modal_inner } from "./elements";
import { DisplayToDoFunc } from "./displayTodos";

export const DisplayProjectFunc = (projectInstance, toDoInstance, checkListInstance) => {
  const projects = projectInstance.getProjectArr();
  console.log(projects);
  //resets the dom whenever we update a project, a to do and mor
  (function resetElementsAndReAppendChildren() {
    sidebar.textContent = '';
    textTitle.textContent = '';
    buttons.textContent = '';
    textTitle.appendChild(paragraphTitle);
    buttons.appendChild(createProjectButton);
  })();

  //calls Form Modal for the Add Project Button
  createProjectButton.addEventListener("click", () => {
    projectFormModal();
  })

  removeProjectHandler();
  showProjects();
//until this what display project func does instantiate the buttons and the projects =========

  //relevant functions===========================
  function showProjects() {
    projects.forEach((project, projectIndex) => {
      const projectTitle = document.createElement("h1");
      projectTitle.textContent = `${project.name}`;
      projectTitle.classList.add("projectTitles");
      projectTitle.addEventListener("click", () => {
        DisplayToDoFunc(projectIndex, toDoInstance, projectInstance, checkListInstance);
      });
      sidebar.appendChild(projectTitle);
    });
  };

  function removeProjectHandler() {
    const buttonDropDown = document.createElement("div");
    buttonDropDown.classList.add('buttonDropdown');

    const removeProjectDropdown = document.createElement("img");
    removeProjectDropdown.src = cogImg;
    removeProjectDropdown.alt = 'Cog';
    removeProjectDropdown.classList.add('logos', 'cog');

    const dropDownItems = document.createElement('div');
    dropDownItems.classList.add('drpdwnitems');

    removeProjectDropdown.addEventListener('click', () => {
      const dropDownToggle = document.querySelector('.drpdwnitems'); 
      dropDownToggle.classList.toggle('active');
    })

    const deleteProjects = document.createElement('h1');
    deleteProjects.textContent = 'Delete Projects';
    deleteProjects.classList = 'deleteProjects';

    const deleteProjectDropDown = document.createElement('div');
    deleteProjectDropDown.classList.add('secondDropdown');

    
    deleteProjects.addEventListener('click', () => {
      deleteProjectDropDown.classList.toggle('active');
    })

    
    projects.forEach((project, projectIndex) => {
      const projectTitle = document.createElement("h1");
      projectTitle.textContent = `${project.name} \u00D7`;
      projectTitle.classList.add("deleteableProjects");
      projectTitle.addEventListener("click", () => deleteProject(projectIndex))
      deleteProjectDropDown.appendChild(projectTitle);
    })
    deleteProjects.appendChild(deleteProjectDropDown)

    const editProjects = document.createElement('h1');
    editProjects.textContent = 'Edit Projects'
    editProjects.classList.add('editProjects');

    const editProjectDropDown = document.createElement('div');
    editProjectDropDown.classList.add('editDropDown')

    editProjects.addEventListener('click', () => {
      editProjectDropDown.classList.toggle('active');
    })

    projects.forEach((project, projectIndex) => {
      const projectTitle = document.createElement("h1");
      projectTitle.textContent = `${project.name} \u00D7`;
      projectTitle.classList.add("deleteableProjects");
      projectTitle.addEventListener("click", () => updateProject(projectIndex))
      editProjectDropDown.appendChild(projectTitle);
    })
    editProjects.appendChild(editProjectDropDown);

    const dropDownItem = [];
    dropDownItem.push(deleteProjects);
    dropDownItem.push(editProjects)
    
    dropDownItem.forEach(item => {
      dropDownItems.appendChild(item);
    })
       
    buttonDropDown.appendChild(removeProjectDropdown);
    buttonDropDown.appendChild(dropDownItems);
    buttons.appendChild(buttonDropDown);
  };


    //creates The form inside the modal form containing the input reqs, submit buttons and close buttons and such
  const projectFormModal = () => {
    modal.classList.add("open");
    overlay.classList.add("open");
    const existingForm = document.querySelector(".projectForm");
    const formprojectsidebar = document.querySelector(".form");
    if (existingForm) {
      console.log(
        "There is currently a form pls fill it up before making another one",
      );
      return;
    }

    const form = document.createElement("form");
    form.noValidate = true;
    form.classList.add("projectForm");

    const inputs = [
      {
        label: "Project Name (up to 3-20 characters): ",
        type: "text",
        name: "projectName",
        id: "projectName",
      },
    ];

    inputs.forEach((inputData) => {
      const label = document.createElement("label");
      label.textContent = inputData.label;
      label.setAttribute("for", inputData.id);

      const input = document.createElement("input");
      input.setAttribute("type", inputData.type);
      input.setAttribute("id", inputData.id);
      input.setAttribute("name", inputData.name);

      const span = document.createElement('span');
      span.className = 'error';
      span.ariaLive = 'polite';

      input.addEventListener('input', () => {
        if (input.validity.valid) {
          span.textContent = "";
          span.className = "error"; // Reset error state
        } else {
          showError(input);
        }
      })

      input.required = true;
      input.autofocus = false;
      input.minLength = 3;
      input.maxLength = 20;
      input.setAttribute("autocomplete", "off");

      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(span);
      form.appendChild(document.createElement("br"));
    });
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDivForm')

    const submitButton = document.createElement("button");
    submitButton.classList.add('submitButton')
    submitButton.type = "submit";
    submitButton.textContent = "Create Project";
    buttonDiv.appendChild(submitButton);

    const closeButton = document.createElement("button");
    closeButton.classList.add('closeButton')
    closeButton.type = "button";
    closeButton.textContent = "Close";
    buttonDiv.appendChild(closeButton);
    closeButton.addEventListener("click", () => {
      form.remove();
      modal.classList.remove("open");
      overlay.classList.remove("open");
    });

    form.appendChild(buttonDiv);

    formprojectsidebar.appendChild(form);
    modal_inner.appendChild(formprojectsidebar);

    const name = document.querySelector("#projectName")
    const nameError = document.querySelector('#projectName + span.error');

    form.addEventListener("submit", (e) => {
      e.preventDefault();
     
      //validation checks
      if (!name.validity.valid) {
        showError(name);
        alert('Invalid Name Submitted');
        return;
      }
      const submittedName = name.value;
      projectInstance.addProjectToProjectArr(submittedName);
      form.remove();
      modal.classList.remove('open');
      overlay.classList.remove('open');
      DisplayProjectFunc(projectInstance, toDoInstance, checkListInstance, DisplayToDoFunc);
    });
    
    const showError = (name) => {
      if (name.validity.valueMissing) {
        nameError.textContent = 'No Title Inputted'
      } else if (name.validity.tooShort) {
        nameError.textContent = 'Title is Less than 3 Chars'
      }
    }
  };

   const deleteProject = (projectIndex) => {
    if (projects.length === 1 ) {
      alert('There is only One Project Left, keep it.');
      return;
    }

    const confirmation = prompt('Type yes to delete this project.');
    if (confirmation === null) {
      return;
    }

    if (confirmation.toLowerCase() === 'yes') {
      projectInstance.deleteProject(projectIndex);
      DisplayProjectFunc(projectInstance, toDoInstance, checkListInstance);
      DisplayToDoFunc((projectIndex - 1 + projects.length) % projects.length, toDoInstance, projectInstance, checkListInstance);
    } else {
      alert('Project deletion canceled.');
      return
    }
  }

  const updateProject = (projectIndex) => {
    const project = projectInstance.getProjectArr()[projectIndex];
    const data = prompt('Type New Project Name. ');
    if (data === null) {
      return;
    }

    projectInstance.updateProject(projectIndex, data, project.toDoList, project.finishList)

    DisplayProjectFunc(projectInstance, toDoInstance, checkListInstance);
    DisplayToDoFunc(projectIndex, toDoInstance, projectInstance, checkListInstance);
  }

};
