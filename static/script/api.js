// let taskList = document.getElementById('incomplete-tasks')
// let completedTaskList = document.getElementById('completed-tasks')

// save all to backend

let postBtn = document.getElementById('save')
postBtn.addEventListener('click', () => {
    completedListItems = completedTaskList.getElementsByTagName('li')
    taskListItems = taskList.getElementsByTagName('li')

    let dataList = []
    // correct way to iterate
    for (li of completedListItems) {
        let children = li.children
        let tempLi = {
            "taskName": children[1].textContent,
            "dateCompleted": getCurrentDate(),
            "completionStatus": children[0].checked ? 1 : 0
        }
        dataList.push(tempLi)
    }

    for (li of taskListItems) {
        let children = li.children
        let tempLi = {
            "taskName": children[1].textContent,
            "dateCompleted": children[0].checked ? getCurrentDate() : null,
            "completionStatus": children[0].checked ? 1 : 0
        }
        dataList.push(tempLi)
    }

    fetch('/savetodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataList)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Success", data)
    })
    .catch(e => {
        console.error("Error", e)
    })

})


// the get request to populate the page
document.addEventListener('DOMContentLoaded', () => {
    completedListItems = completedTaskList.getElementsByTagName('li')
    taskListItems = taskList.getElementsByTagName('li')

    fetch('/gettodos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => {
       if (data.length < 1) {
        console.log("no Saved todos!") 
       } else {
        console.log("Success", data)
        populateDOM(data)
       }
    })
    .catch(e => {
        console.error("Error", e)
    })

})


function populateDOM(data){
    // sorting the data by completion and creating elements
    for (obj of data) {
        if (obj.completionStatus) {
            let bullet = document.createElement("li")

            // things to append to bullet li
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.checked = true
            checkbox.addEventListener('change', () => {
                checkbox.checked ? completeBullet(bullet) : uncompleteBullet(bullet)
            })
        
            let label = document.createElement("label")
            label.textContent = obj.taskName
        
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
            completedTaskList.appendChild(bullet)
        } else {
            let bullet = document.createElement("li")

            // things to append to bullet li
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.checked = false
            checkbox.addEventListener('change', () => {
                checkbox.checked ? completeBullet(bullet) : uncompleteBullet(bullet)
            })
        
            let label = document.createElement("label")
            label.textContent = obj.taskName
        
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
            taskList.appendChild(bullet)
        }
    }
}

function getCurrentDate() {
    // Create a new Date object representing the current date and time
    var currentDate = new Date();

    // Get the individual components of the date
    var year = currentDate.getUTCFullYear();
    var month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    var day = String(currentDate.getUTCDate()).padStart(2, '0');

    // Format the date as "YYYY-MM-DD"
    var formattedDate = year + '-' + month + '-' + day;

    return formattedDate;
}