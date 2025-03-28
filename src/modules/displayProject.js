import cogImg from "../logos/cog.svg";

export const ProjectDisplayFunc = (projectInstance, toDoInstance, toDoDisplayFunc) => {
  const projects = projectInstance.getProjectArr();

  const sidebar = document.querySelector(".sidebar");
  sidebar.textContent = "";

  const textTitle = document.querySelector(".text-title");
  textTitle.textContent = "";
  const buttons = document.querySelector(".buttons");
  buttons.textContent = "";

  const paragraphTitle = document.createElement("h1");
  const oneTitleOnly = document.querySelector(".paraTitle");

  if (!oneTitleOnly) {
    paragraphTitle.classList.add("paraTitle");
    paragraphTitle.textContent = "Projects";
    textTitle.appendChild(paragraphTitle);
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

  const createProjectHandler = () => {
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");

    const createProjectButton = document.createElement("button");
    createProjectButton.classList.add("button");
    createProjectButton.textContent = "Add Project";
    createProjectButton.addEventListener("click", () => {
      projectFormModal();
    });
    buttonDiv.appendChild(createProjectButton);
    buttons.appendChild(buttonDiv);
  };

  const removeProjectHandler = () => {

    const buttonDropDown = document.createElement("div");
    buttonDropDown.classList.add('buttonDropdown');

    const removeProjectDropdown = document.createElement("img");
    removeProjectDropdown.src = cogImg;
    removeProjectDropdown.alt = 'Cog';
    removeProjectDropdown.classList.add('logos', 'cog');

    const dropDownItems = document.createElement('div');
    dropDownItems.classList.add('drpdwnitems');

    removeProjectDropdown.addEventListener('click', () => {
      const dropDownToggle = document.querySelector('.drpdwnitems') 
      dropDownToggle.classList.toggle('active')
    })

    const deleteProjects = document.createElement('h1');
    deleteProjects.textContent = "Delete Project";
    deleteProjects.classList = "deleteProjects"

    deleteProjects.addEventListener('click', () => {
      const dropDownToggle = document.querySelector('.secondDropdown');
      dropDownToggle.classList.toggle('active')
    })

    const deleteProjectDropDown = document.createElement('div');
    deleteProjectDropDown.classList.add('secondDropdown');

    projects.forEach((project, projectIndex) => {
      const projectTitle = document.createElement("h1");
      projectTitle.textContent = `${project.name} \u00D7`;
      projectTitle.classList.add("deleteableProjects");
      projectTitle.addEventListener("click", () => {
        if (projects.length !== 1 ) {
          projectInstance.deleteProject(projectIndex);
          ProjectDisplayFunc(projectInstance, toDoInstance, toDoDisplayFunc);
          toDoDisplayFunc(projectIndex - 1, toDoInstance, projectInstance);
        } else {
          alert("There is only One Project Left, keep it.")
        }
      });
      deleteProjectDropDown.appendChild(projectTitle);
    })

    deleteProjects.appendChild(deleteProjectDropDown);

    const dropDownItem = [];
    dropDownItem.push(deleteProjects);
    
    dropDownItem.forEach(item => {
      dropDownItems.appendChild(item);
    })
       
    buttonDropDown.appendChild(removeProjectDropdown);
    buttonDropDown.appendChild(dropDownItems);
    buttons.appendChild(buttonDropDown);
  };

  createProjectHandler();
  removeProjectHandler();

  projects.forEach((project, projectIndex) => {
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = `${project.name}`;
    projectTitle.classList.add("projectTitles");
    projectTitle.addEventListener("click", () => {
      toDoDisplayFunc(projectIndex, toDoInstance, projectInstance);
    });
    sidebar.appendChild(projectTitle);
  });

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
        label: "Project Name (up to 3-30 characters): ",
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
      input.maxLength = 30;
      input.setAttribute("autocomplete", "off");

      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(span);
      form.appendChild(document.createElement("br"));
    });

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create Project";
    form.appendChild(submitButton);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.textContent = "Close";
    form.appendChild(closeButton);
    closeButton.addEventListener("click", () => {
      form.remove();
      modal.classList.remove("open");
      overlay.classList.remove("open");
    });

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
      modal.classList.remove("open");
      overlay.classList.remove("open");
      ProjectDisplayFunc(projectInstance, toDoInstance, toDoDisplayFunc);
    });
    
    const showError = (name) => {
      if (name.validity.valueMissing) {
        nameError.textContent = 'No Title Inputted'
      } else if (name.validity.tooShort) {
        nameError.textContent = 'Title is Less than 3 Chars'
      }
    }
  };
};
