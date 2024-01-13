const todoValue = document.getElementById('todo-text'),
    listItems = document.getElementById('list-items'),
    addUpdateClick = document.getElementById('update-btn');

let selectedElement;
let todoData = JSON.parse(localStorage.getItem("todoData")) || [];
ReadToDoItems();

todoValue.addEventListener('keyup', function (e) {
    if (e.key === "Enter") {
        addUpdateClick.click();
    }
});

addUpdateClick.addEventListener('click', createToDoData);

function ReadToDoItems() {
    clearListItems();

    todoData.forEach(element => {
        renderToDoItem(element);
    });
}

function renderToDoItem(element) {
    let li = document.createElement('li');
    const todoItems = `<div onclick="ToggleCompletion(this)">${element.item}</div><div><img class="edit" onclick="UpdateToDoItem(this)" style="padding-right: 8px; width: 28px;" src="../images/edit.png"><img class="delete" onclick="DeleteToDoItem(this)" style="width: 20px;" src="../images/delete.png"></div>`;
    li.innerHTML = todoItems;

    if (element.status) {
        li.firstChild.style.textDecoration = "line-through";
        li.firstChild.style.pointerEvents = "none"; 
        li.querySelector('.edit').style.display = "none"; 
    }

    listItems.appendChild(li);
}

function clearListItems() {
    listItems.innerHTML = "";
}

function createToDoData() {
    if (todoValue.value === '') {
        alert('Please enter some text');
        todoValue.focus();
        return;
    }

    if (addUpdateClick.getAttribute("src") === "../images/refresh.png" && todoValue.value !== "") {
        // If updating, modify the data in todoData array directly
        todoData.forEach(element => {
            if (element.item === selectedElement.innerText.trim()) {
                element.item = todoValue.value;
            }
        });

        // Update local storage and re-render the list
        setLocalStorage();
        ReadToDoItems();
    } else {
        // Add a new item
        renderToDoItem({ item: todoValue.value, status: false });
        let dataItem = { item: todoValue.value, status: false };
        todoData.push(dataItem);

        // Update local storage and re-render the list
        setLocalStorage();
        ReadToDoItems();
    }

    addUpdateClick.setAttribute("src", "../images/add.png");
    todoValue.value = "";
}

function ToggleCompletion(element) {
    // Toggle completion status and style
    const taskIndex = todoData.findIndex(item => item.item === element.innerText);
    if (taskIndex !== -1) {
        todoData[taskIndex].status = !todoData[taskIndex].status;
        setLocalStorage();
        ReadToDoItems(); // Re-render the list after toggling completion
    }
}

function UpdateToDoItem(e) {
    // Set selectedElement for updating
    selectedElement = e.parentElement.parentElement.querySelector("div");

    // Check if the task is completed before allowing updates
    const taskIndex = todoData.findIndex(item => item.item === selectedElement.innerText);
    if (taskIndex !== -1 && !todoData[taskIndex].status) {
        todoValue.value = selectedElement.innerText;
        addUpdateClick.setAttribute("src", "../images/refresh.png");
    }
}

function DeleteToDoItem(e) {
    let deleteConfirm = e.parentElement.parentElement.querySelector("div").innerText;

    if (confirm(`Are you sure you want to delete this ${deleteConfirm}?`)) {
        e.parentElement.parentElement.remove();
        todoValue.focus();

        // Find the index of the element in todoData array
        let index = todoData.findIndex((element) => element.item === deleteConfirm.trim());

        if (index !== -1) {
            // Remove the element at the found index
            todoData.splice(index, 1);

            // Update local storage and re-render the list
            setLocalStorage();
            ReadToDoItems();
        }
    }
}

function setLocalStorage() {
    localStorage.setItem("todoData", JSON.stringify(todoData));
}
