document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value;
        const taskPriority = prioritySelect.value;
        addTask(taskText, taskPriority);
        saveTasks();
        taskInput.value = '';
    });

    // Handle task actions
    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.parentElement.parentElement);
        } else if (e.target.classList.contains('edit')) {
            editTask(e.target.parentElement.parentElement);
        } else if (e.target.classList.contains('complete')) {
            toggleComplete(e.target.parentElement.parentElement);
        }
        saveTasks();
    });

    function addTask(text, priority) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="task-text">${text}</span>
            <span class="priority priority-${priority}">${priority}</span>
            <div class="actions">
                <button class="complete">Complete</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('.task-text').textContent;
        taskInput.value = taskText;
        deleteTask(taskItem);
    }

    function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                priority: taskItem.querySelector('.priority').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.priority);
            if (task.completed) {
                const taskItem = taskList.lastElementChild;
                taskItem.classList.add('completed');
            }
        });
    }
});
