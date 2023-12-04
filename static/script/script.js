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
    checkbox.addEventListener('change', () => {
        checkbox.checked ? completeBullet(bullet) : uncompleteBullet(bullet)
    })

    let label = document.createElement("label")
    label.textContent = text

    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.onclick = (() => editTask(editBtn))

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.onclick = (() => deleteTask(deleteBtn))

    bullet.appendChild(checkbox)
    bullet.appendChild(label)
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
    let label = btn.previousElementSibling
    let existingText = label.textContent

    let input = document.createElement("input")
    input.type = "text"
    input.value = label.textContent

    li.removeChild(label.previousElementSibling)
    li.replaceChild(input, label)


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
    let label = document.createElement("label")
    let newText = btn.previousElementSibling.value
    label.textContent = newText
    
    let li = btn.parentNode
    li.replaceChild(label, btn.previousElementSibling)

    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.onclick = (() => editTask(editBtn))

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.onclick = (() => deleteTask(deleteBtn))

    li.insertBefore(checkbox, label)
    li.replaceChild(editBtn, btn)
    li.replaceChild(deleteBtn, editBtn.nextElementSibling)
    
}

// move everything back
function cancelEditTask(btn, txt) {
    let li = btn.parentNode
    let saveBtn = btn.previousElementSibling
    let input = saveBtn.previousElementSibling

    let label = document.createElement("label")
    label.textContent = txt

    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.onclick = (() => editTask(editBtn))

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.onclick = (() => deleteTask(deleteBtn))

    li.insertBefore(checkbox, input)
    li.replaceChild(label, input)
    li.replaceChild(editBtn, saveBtn)
    li.replaceChild(deleteBtn, btn)
}

// handle the checked box
function completeBullet(bullet) {
    let container = document.getElementById('completed-tasks')
    container.appendChild(bullet)
}

function uncompleteBullet(bullet) {
    let container = document.getElementById('incomplete-tasks')
    container.appendChild(bullet)
}
