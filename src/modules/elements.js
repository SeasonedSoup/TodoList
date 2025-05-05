import cogImg from "../logos/cog.svg";
    
    // for display project.js //
    
    //static html elements layout =====
    const sidebar = document.querySelector('.sidebar');
    
    const textTitle = document.querySelector('.text-title');
   
    const buttons = document.querySelector(".buttons");
    //=====

    //dynamically created & appended========
    const paragraphTitle = document.createElement('h1');
    paragraphTitle.classList.add('paraTitle') 
    paragraphTitle.textContent = 'Projects'; 

    const createProjectButton = document.createElement("button");
    createProjectButton.classList.add("button");
    createProjectButton.textContent = "Add Project";

    //==

    const buttonDropDown = document.createElement("div");
    buttonDropDown.classList.add('buttonDropdown');
    
    const removeProjectDropdown = document.createElement("img");
    removeProjectDropdown.src = cogImg;
    removeProjectDropdown.alt = 'Cog';
    removeProjectDropdown.classList.add('logos', 'cog');

    const dropDownItems = document.createElement('div');
    dropDownItems.classList.add('drpdwnitems');


    const deleteProjects = document.createElement('h1');
    deleteProjects.textContent = 'Delete Project';
    deleteProjects.classList = 'deleteProjects';

    export {sidebar, textTitle, buttons , paragraphTitle, createProjectButton, buttonDropDown, removeProjectDropdown, dropDownItems, deleteProjects}
    //======
    
    
    //for display todo.js
    const projectText = document.createElement("h1");
    projectText.classList.add("paragraphTitle");
    
    export {projectText};

    //modal elements for form
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const modal = document.createElement("div");
    overlay.appendChild(modal);
    modal.classList.add("modal");

    const modal_inner = document.createElement("div");
    modal_inner.classList.add("inner-modal");

    modal.appendChild(modal_inner);
    document.body.appendChild(overlay);

    const checkListDiv = document.createElement('div');
    checkListDiv.classList.add('checkListDiv');

    export {overlay, modal, modal_inner,checkListDiv};