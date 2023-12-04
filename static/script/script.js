// To start off, let’s define the list of features our to-do list app has:
// o	Add a task
// o	Edit a task
// o	Mark tasks as done
// o	Delete a task
// o	Clear all tasks
// First off, out to do list app must need an option that we can add a task to the list, and later on, we can edit the task as we want. Next, after finishing a task, we should mark it as complete and move this task to another section. Also, we want to make our app more flexible, so we add another option to delete an unfinished task. After all, when the list becomes too verbose, we have a last option to clear all the tasks, both completed and uncompleted.


// grab the add button and do something
let addButton = document.getElementById('add-Btn')
let addButtonInput = document.getElementById('new-task') // no Input yet so wait
let taskList = document.getElementById('incomplete-tasks')

// so this needs to append a check box ul type thing with text and two buttons to the section2
addButton.addEventListener('click', () => {
    taskList.appendChild(createTask(addButtonInput.value))
})

// lets write function to make the 'line' for the entries
function createTask(text) {
    let bullet = document.createElement("li")

    // things to append to bullet li
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    let p = document.createElement("p")
    p.textContent = text

    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.onclick = (() => editTask(editBtn))

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.onclick = (() => deleteTask(deleteBtn))

    bullet.appendChild(checkbox)
    bullet.appendChild(p)
    bullet.appendChild(editBtn)
    bullet.appendChild(deleteBtn)
    return bullet
}

// function for each button
function deleteTask(btn) {
    let li = btn.parentNode
    let ul = li.parentNode
    ul.removeChild(li)
}

function editTask(btn) {
    let li = btn.parentNode
    let ul = li.parentNode
    let p = btn.previousElementSibling
    let existingText = p.textContent

    let input = document.createElement("input")
    input.type = "text"
    input.value = p.textContent

    li.replaceChild(input, p)


    let saveBtn = document.createElement("button")
    saveBtn.textContent = "Save"
    saveBtn.onclick = (() => saveEditTask(saveBtn))

    let cancelBtn = document.createElement("button")
    cancelBtn.textContent = "Cancel"
    cancelBtn.onclick = (() => cancelEditTask(cancelBtn, existingText))

    li.replaceChild(saveBtn, btn)
    li.replaceChild(cancelBtn, saveBtn.nextElementSibling)
}

// take that new input value and change it to a p
function saveEditTask(btn) {
    let p = document.createElement("p")
    let newText = btn.previousElementSibling.value
    p.textContent = newText
    console.log(p.textContent)
}

// move everything back
function cancelEditTask(btn, txt) {

}
