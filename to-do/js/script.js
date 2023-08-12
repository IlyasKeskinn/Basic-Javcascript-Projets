// Use strict mode for better coding practices.
"use-strict";




// Array of tasks with their details.
let taskList = []

if (localStorage.getItem("taskList") !== null) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}


// Get the <ul> element with the id "task-list".
const taskUl = document.getElementById("task-list");
const taskInput = document.querySelector("#txtTaskName");
const btnAddTask = document.querySelector("#btnAddTask");
const btnClear = document.querySelector("#btnClear");
let editId;
let isEditMode = false;
let filters = document.querySelectorAll(".filters span");


// Initial task display.
showTasks("all");

// Function to display tasks based on the filter.
function showTasks(filter) {
    taskUl.innerHTML = "";

    // Display a message if there are no tasks.
    if (taskList.length == 0) {
        taskUl.innerHTML = "<p class= 'p-3 m-0 lead'>No Mission</p>"
    }

    // Loop through each task in the taskList array.
    for (let task of taskList) {
        let completed = task.isCompleted == true ? "checked" : "";
        let status = task.isCompleted == true ? "completed" : "pending"

        // Check if task should be displayed based on filter.
        if (filter == status || filter == "all") {
            // Create an HTML string for a list item (<li>) representing a task.
            let li = ` 
            <li class="task list-group-item">
            <div class="form-check">
                <input type="checkbox" onclick = "updateStatus(this)"  id="${task.id}" class="form-check-input" ${completed}>
                <label for="${task.id}" id="${task.id}" class="form-check-label ${completed} ">${task.taskName} </label>
            </div>
            <div class="dropdown"> 
                <button class = "btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" ><i class="fa-solid fa-ellipsis-vertical"></i></button>  
                <ul class = "dropdown-menu"> 
                    <li> <a onclick= "deleteTask(${task.id})" class= "dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Delete</a> </li>
                    <li> <a onclick= "updateTask(${task.id}, '${task.taskName}')" class= "dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Update</a> </li>
                </ul>
            </div>
            </li>                   
                `
            // Insert the newly created list item at the beginning of the <ul> element.
            taskUl.insertAdjacentHTML("afterbegin", li);
        }




    }

}
// Event listener for adding a new task
btnAddTask.addEventListener("click", addTask);

// Function to add a new task.
function addTask(event) {
    let taskName = taskInput.value;

    if (taskName == "") {
        alert("Task cannot be added empty");

    } else {
        // Add or update task based on edit mode.
        if (!isEditMode) {
            taskList.push({ "id": taskList.length + 1, "taskName": taskName, "isCompleted": false });
        } else {
            for (let task of taskList) {
                if (task.id == editId) {
                    task.taskName = taskInput.value;

                }
                isEditMode = false;
                btnAddTask.value = "Add"
            }
        }
        taskInput.value = "";
        localStorage.setItem("taskList", JSON.stringify(taskList));
        showTasks(document.querySelector("span.active").id);
    }

    event.preventDefault();
}

// Event listeners for filter options.
for (let span of filters) {
    span.addEventListener('click', function () {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        showTasks(span.id)
    });

}

// Function to delete a task.

function deleteTask(id) {

    let deletedId;

    // for(index in taskList){
    //     if (taskList[index].id == id) {
    //         deletedId = index;
    //     }
    // }

    // deletedId = taskList.findIndex(function (task) {
    //   return  task.id == id;
    // })


    deletedId = taskList.findIndex(task => task.id == id);


    taskList.splice(deletedId, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    showTasks(document.querySelector("span.active").id)

}

// Function to update a task.
function updateTask(id, name) {
    editId = id;
    isEditMode = true;
    taskInput.value = name;
    taskInput.classList.add("active");
    taskInput.focus();
    btnAddTask.value = "Update"

}

// Event listener for the Clear button.
btnClear.addEventListener("click", clearTask);

// Function to clear all tasks.
function clearTask() {
    taskList.splice(0, taskList.length);
    localStorage.setItem("taskList", JSON.stringify(taskList));

    showTasks(document.querySelector("span.active").id)

}

// Function to update the status of a task.
function updateStatus(checkbox) {
    let label = checkbox.nextElementSibling;
    let status;

    if (checkbox.checked) {
        label.classList.add("checked");
        status = true;
    }
    else {
        label.classList.remove("checked");
        status = false;
    }
    for (let task of taskList) {
        if (label.id == task.id) {
            task.isCompleted = status;
        }
    }

    localStorage.setItem("taskList", JSON.stringify(taskList));
    showTasks(document.querySelector("span.active").id)

}


