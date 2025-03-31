    //paragraph message
    const paragraphTitle = document.createElement("h1");
    paragraphTitle.classList.add("paragraphTitle");
    
    export {paragraphTitle};

    //modal elements
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const modal = document.createElement("div");
    overlay.appendChild(modal);
    modal.classList.add("modal");

    const modal_inner = document.createElement("div");
    modal_inner.classList.add("inner-modal");

    modal.appendChild(modal_inner);
    document.body.appendChild(overlay);

    export {overlay, modal, modal_inner};