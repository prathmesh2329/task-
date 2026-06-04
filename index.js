const taskInput  = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('workTasks')) || [];
function renderTasks(){
    taskList.innerHTML = '';
tasks.forEach((task, index) => {
const li = document.createElement('li');
if(task.completed) li.classList.add('completed');
li.innerHTML = `
<span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
<button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
 `;
 taskList.appendChild(li); 
})
}
//new task
function addTask(){
    const taskText =  taskInput.value.trim();
    if (taskText ==='') return;
    tasks.push({text:taskText,  complete :false });
    saveAndRender();
    taskInput.value = '';
}
//toggle complete 
window.toggleTask = function(index){
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}
// for delete
window.deleteTask = function(index){
    tasks.splice(index,1);
    saveAndRender();
}
//local storage
function saveAndRender(){
    localStorage.setItem('workTasks', JSON.stringify(tasks));
    renderTasks();
}
//event
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
renderTasks();
