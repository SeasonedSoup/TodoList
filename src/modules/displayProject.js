import cogImg from "../logos/cog.svg";
import { overlay, modal, modal_inner } from "./elements";

export const DisplayProjectFunc = (projectInstance, toDoInstance, checkListInstance, DisplayToDoFunc) => {
  // Selects and loads the contents inside the HTML sidebar
  function loadSideBarContents() {
    const sidebar = document.querySelector('.sidebar');
    const textTitle = document.querySelector('.text-title');
    sidebar.textContent = '';
    textTitle.textContent = '';
    const buttons = document.querySelector(".buttons");
    buttons.textContent = '';
    const paragraphTitle = document.createElement('h1');
    const oneTitleOnly = document.querySelector('.paraTitle');
    
    if (!oneTitleOnly) {
      paragraphTitle.classList.add('paraTitle');
      paragraphTitle.textContent = 'Projects';
      textTitle.appendChild(paragraphTitle);
    }
    
    return { buttons, sidebar };
  }

  // Button logics
  const elements = loadSideBarContents();
  const projects = projectInstance.getProjectArr();

  // Creates project, call project form modal when clicked
  const createProjectHandler = () => {
    const createProjectButton = document.createElement("button");
    createProjectButton.classList.add("button");
    createProjectButton.textContent = "Add Project";
    createProjectButton.addEventListener("click", () => {
      projectFormModal();
    });
    elements.buttons.appendChild(createProjectButton);
  };

  // Deletes project, cog when clicked adds a delete project dropdown
  // Adds listener for each project, calls the logic that deletes the project and re-updates
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
      const dropDownToggle = document.querySelector('.drpdwnitems');
      dropDownToggle.classList.toggle('active');
    });

    const deleteProjects = document.createElement('h1');
    deleteProjects.textContent = 'Delete Project';
    deleteProjects.classList = 'deleteProjects';

    deleteProjects.addEventListener('click', () => {
      const dropDownToggle = document.querySelector('.secondDropdown');
      dropDownToggle.classList.toggle('active');
    });

    const deleteProjectDropDown = document.createElement('div');
    deleteProjectDropDown.classList.add('secondDropdown');

    projects.forEach((project, projectIndex) => {
      const projectTitle = document.createElement("h1");
      projectTitle.textContent = `${project.name} \u00D7`;
      projectTitle.classList.add("deleteableProjects");
      projectTitle.addEventListener("click", () => {
        if (projects.length === 1) {
          alert('There is only One Project Left, keep it.');
          return;
        }

        const confirmation = prompt('Type yes to delete this project.');
        if (confirmation === null) {
          return;
        }

        if (confirmation.toLowerCase() === 'yes') {
          projectInstance.deleteProject(projectIndex);
          DisplayProjectFunc(projectInstance, toDoInstance, checkListInstance, DisplayToDoFunc);
          DisplayToDoFunc(projectIndex - 1, toDoInstance, projectInstance, checkListInstance);
        } else {
          alert('Project deletion canceled.');
          return;
        }
      });
      deleteProjectDropDown.appendChild(projectTitle);
    });

    deleteProjects.appendChild(deleteProjectDropDown);

    const dropDownItem = [];
    dropDownItem.push(deleteProjects);

    dropDownItem.forEach(item => {
      dropDownItems.appendChild(item);
    });

    buttonDropDown.appendChild(removeProjectDropdown);
    buttonDropDown.appendChild(dropDownItems);
    elements.buttons.appendChild(buttonDropDown);
  };

  // Displays the projects inside sidebar div
  const showProjects = () => {
    projects.forEach((project, projectIndex) => {
      const projectTitle = document.createElement("h1");
      projectTitle.textContent = `${project.name}`;
      projectTitle.classList.add("projectTitles");
      projectTitle.addEventListener("click", () => {
        DisplayToDoFunc(projectIndex, toDoInstance, projectInstance, checkListInstance);
      });
      elements.sidebar.appendChild(projectTitle);
    });
  };

  // Creates a form that asks for the Project Name
  const projectFormModal = () => {
    modal.classList.add("open");
    overlay.classList.add("open");
    const existingForm = document.querySelector(".projectForm");
    const formprojectsidebar = document.querySelector(".form");
    if (existingForm) {
      console.log("There is currently a form, please fill it up before making another one.");
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

    inputs.forEach((inputD
