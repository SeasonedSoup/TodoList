import { ProjectFunc } from "./project";
import { toDoDisplayFunc } from "./displayTodos";

//testing data will be named Default Project
const instanceOfProjects = ProjectFunc();

export const ProjectDisplayFunc = () => {
  const projects = instanceOfProjects.getProjectArr();

  const projectsidebar = document.querySelector(".project-sidebar");
  projectsidebar.textContent = "";

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




    const buttonDiv = document.createElement("div");

            const removeProjectDropdown = document.createElement("button");
    removeProjectDropdown.textContent = "COG";

    const dropdown = document.createElement("select"); 
    dropdown.classList.add("dropdown", "hidden");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Project";

    const populateDropdown = () => {
      dropdown.innerHTML = "";

      projects.forEach((project, projectIndex) => {
        const option = document.createElement("option");
        option.value = projectIndex;
        option.textContent = project.name;
        dropdown.appendChild(option);
      });
    };

    removeProjectDropdown.addEventListener("click", () => {
      populateDropdown();
    });

    deleteButton.addEventListener("click", () => {
      const selectedIndex = dropdown.value;
      if (selectedIndex !== "" && projects.length !== 1) {
        instanceOfProjects.deleteProject(selectedIndex);
        populateDropdown();
        ProjectDisplayFunc();
      } else {
        console.log("CANT DELETE");
      }
    });

    buttonDiv.appendChild(removeProjectDropdown);
    buttonDiv.append(dropdown);
    buttonDiv.appendChild(deleteButton);
    buttons.appendChild(buttonDiv);
  };

  createProjectHandler();
  removeProjectHandler();

  projects.forEach((project, projectIndex) => {
    const projectTitle = document.createElement("h1");
    projectTitle.textContent = `${project.name}`;
    projectTitle.classList.add("projectTitles");
    projectTitle.addEventListener("click", () => {
      console.log("Clicked Project Position:", projectIndex);
      toDoDisplayFunc(projectIndex);
    });
    projectsidebar.appendChild(projectTitle);
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
    form.classList.add("projectForm");

    const inputs = [
      {
        label: "Project Name: ",
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

      input.required = true;

      form.appendChild(label);
      form.appendChild(input);
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

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submittedName = document.querySelector("#projectName").value;
      instanceOfProjects.addProjectToProjectArr(submittedName);
      form.remove();
      modal.classList.remove("open");
      overlay.classList.remove("open");
      ProjectDisplayFunc();
      //function that called to show and append all projects for the new project made to show in the dom
      //showProjects();
    });
  };
};
