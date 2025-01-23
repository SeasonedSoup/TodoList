 export const displayForm = () => {
    document.getElementById('add-todo-form').style.display = '';
 }

 displayForm();

export const acceptUserInputChecklists = () => {
   const addItem = document.getElementById('insert-checklist').value;

   if (addItem != '') {
      const ul = document.querySelector('.lists-of-checklists')
      const li = document.createElement('li')
      li.textContent = addItem;

      const span = document.createElement('span')
      span.classList.add('remove-checklist-item');
      const removeIcon = document.createTextNode('/u00D7');

      span.appendChild(removeIcon)
      li.appendChild(span)
      ul.appendChild(li)

      //reset
      document.getElementById('insert-checklist').value = '';


   }

   //if the addItemValue contains something
   /*Select the ul in html, createa new element, a span with the x icon  and reset the value after appending to the dom */
}



