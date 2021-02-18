

// UI Class

class UI {

    static dropdownMenu() {
        const dropMenu = document.getElementById('dropdown');

        if (dropMenu.style.display == 'block') {
            dropMenu.style.display = 'none';
        } else {
            dropMenu.style.display = 'block';
        }
    }

    static selectImportance(e) {
        const importance = document.getElementById('selected-importance');
        let targetedImportance = e.target.innerText;
        importance.innerText = targetedImportance;
    }

    static displayTask() {
        const tasks = Store.getTasks();

        tasks.forEach((task) => UI.addTaskToList(task));
    }

    static addTaskToList(task) {
        const list = document.getElementById('to-do-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td class="task-date">${task.date}</td>
        <td class="task-text">${task.text}</td>
        <td class="d-none">${task.importance}</td>
        <td class="d-none">${task.id}</td>
        <td class="btn-container"><span class="completed">Completed</span></td>
        <td class="btn-container"><span class="delete">Delete</span></td>
        `

        list.appendChild(row);
    }

    static deleteTask(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.querySelector('#date').value = '';
        document.querySelector('#toDo').value = '';
    }

}

// Task class: Reprezents a task on the To Do List

class Task {
    constructor(date, text, importance, id) {
        this.date = date;
        this.text = text;
        this.importance = importance;
        this.id = id;
    }
}

// Handle storage

class Store {
    static getTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        return tasks;
    }

    static addTask(task) {
        const tasks = Store.getTasks();

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask(id) {
        const tasks = Store.getTasks();

        tasks.forEach((task, index) => {
            if (task.id == id) {
                tasks.splice(index, 1);
            }
        })

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


// Variables

const dropdown = document.getElementById('task-importance');
const dropedMenu = document.getElementById('dropdown');
const submit = document.getElementById('submit');

// Events

dropdown.addEventListener('click', UI.dropdownMenu);
dropedMenu.addEventListener('click', UI.selectImportance);
submit.addEventListener('click', (e) => {
    // Prevent actual submit
    e.preventDefault();
    //Get form values
    const date = document.querySelector('#date').value;
    const text = document.querySelector('#toDo').value;
    const importance = document.querySelector('#selected-importance').innerText;
    let id = Math.floor(Math.random()*100);

    // Instantiate Task
    const task = new Task(date, text, importance, id);

    //Add Task to UI
    UI.addTaskToList(task);

    //Add Task to Storage
    Store.addTask(task);

    //Clear fields

    UI.clearFields();
})